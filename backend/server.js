const jsonServer = require("json-server");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// CORS Configuration - Allow all origins
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

server.use(cors(corsOptions));

// Custom middleware for authentication and business logic
server.use(jsonServer.bodyParser);
server.use(middlewares);

// Swagger UI setup
server.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Attendance API Documentation",
  }),
);

// Helper function to generate auth token
const generateToken = (user) => {
  return Buffer.from(`${user.username}:${user.role}:${Date.now()}`).toString(
    "base64",
  );
};

// Helper function to verify token
const verifyToken = (token) => {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [username, role] = decoded.split(":");
    return { username, role };
  } catch {
    return null;
  }
};

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = user;
  next();
};

// Login endpoint
server.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const db = router.db;
  const user = db.get("users").find({ username }).value();

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      email: user.email,
    },
  });
});

// Mark attendance endpoint (once per day validation)
server.post("/api/attendance", authenticate, (req, res) => {
  const db = router.db;
  const today = new Date().toISOString().split("T")[0];

  // Check if attendance already marked today
  const existingAttendance = db
    .get("attendance")
    .find({ userId: req.user.username, date: today })
    .value();

  if (existingAttendance) {
    return res
      .status(400)
      .json({ error: "Attendance already marked for today" });
  }

  const newAttendance = {
    id: Date.now().toString(),
    userId: req.user.username,
    date: today,
    status: "Present",
    timestamp: new Date().toISOString(),
  };

  db.get("attendance").push(newAttendance).write();

  res.status(201).json({
    message: "Attendance marked successfully",
    attendance: newAttendance,
  });
});

// Get user's own attendance
server.get("/api/attendance/me", authenticate, (req, res) => {
  const db = router.db;
  const userAttendance = db
    .get("attendance")
    .filter({ userId: req.user.username })
    .value();

  res.json(userAttendance);
});

// Get attendance stats for user
server.get("/api/attendance/stats", authenticate, (req, res) => {
  const db = router.db;
  const userAttendance = db
    .get("attendance")
    .filter({ userId: req.user.username })
    .value();

  const totalDays = userAttendance.length;
  const presentDays = userAttendance.filter(
    (a) => a.status === "Present",
  ).length;
  const percentage =
    totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0;

  res.json({
    totalDays,
    presentDays,
    absentDays: totalDays - presentDays,
    percentage: parseFloat(percentage),
  });
});

// Get user's leave requests
server.get("/api/leaves/me", authenticate, (req, res) => {
  const db = router.db;
  const userLeaves = db
    .get("leaves")
    .filter({ userId: req.user.username })
    .value();

  res.json(userLeaves);
});

// Create leave request
server.post("/api/leaves", authenticate, (req, res) => {
  const { startDate, endDate, reason } = req.body;

  if (!startDate || !endDate || !reason) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const db = router.db;
  const newLeave = {
    id: Date.now().toString(),
    userId: req.user.username,
    startDate,
    endDate,
    reason,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  db.get("leaves").push(newLeave).write();

  res.status(201).json({
    message: "Leave request created successfully",
    leave: newLeave,
  });
});

// Update leave request (only pending)
server.put("/api/leaves/:id", authenticate, (req, res) => {
  const db = router.db;
  const leave = db
    .get("leaves")
    .find({ id: req.params.id, userId: req.user.username })
    .value();

  if (!leave) {
    return res.status(404).json({ error: "Leave request not found" });
  }

  if (leave.status !== "Pending") {
    return res
      .status(400)
      .json({ error: "Can only update pending leave requests" });
  }

  const { startDate, endDate, reason } = req.body;

  db.get("leaves")
    .find({ id: req.params.id })
    .assign({ startDate, endDate, reason })
    .write();

  const updatedLeave = db.get("leaves").find({ id: req.params.id }).value();

  res.json({
    message: "Leave request updated successfully",
    leave: updatedLeave,
  });
});

// Delete leave request (only pending)
server.delete("/api/leaves/:id", authenticate, (req, res) => {
  const db = router.db;
  const leave = db
    .get("leaves")
    .find({ id: req.params.id, userId: req.user.username })
    .value();

  if (!leave) {
    return res.status(404).json({ error: "Leave request not found" });
  }

  if (leave.status !== "Pending") {
    return res
      .status(400)
      .json({ error: "Can only delete pending leave requests" });
  }

  db.get("leaves").remove({ id: req.params.id }).write();

  res.json({ message: "Leave request deleted successfully" });
});

// Admin: Get all users
server.get("/api/admin/users", authenticate, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  const db = router.db;
  const users = db
    .get("users")
    .map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      email: user.email,
    }))
    .value();

  res.json(users);
});

// Admin: Create user
server.post("/api/admin/users", authenticate, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  const { username, password, role, name, email } = req.body;

  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ error: "Username, password, and role are required" });
  }

  const db = router.db;

  // Check if username already exists
  const existingUser = db.get("users").find({ username }).value();
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const newUser = {
    id: Date.now().toString(),
    username,
    password,
    role: role || "user",
    name: name || "",
    email: email || "",
  };

  db.get("users").push(newUser).write();

  res.status(201).json({
    message: "User created successfully",
    user: {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
      name: newUser.name,
      email: newUser.email,
    },
  });
});

// Admin: Update user
server.put("/api/admin/users/:id", authenticate, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  const db = router.db;
  const user = db.get("users").find({ id: req.params.id }).value();

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { username, password, role, name, email } = req.body;
  const updates = {};

  if (username) updates.username = username;
  if (password) updates.password = password;
  if (role) updates.role = role;
  if (name !== undefined) updates.name = name;
  if (email !== undefined) updates.email = email;

  db.get("users").find({ id: req.params.id }).assign(updates).write();

  const updatedUser = db.get("users").find({ id: req.params.id }).value();

  res.json({
    message: "User updated successfully",
    user: {
      id: updatedUser.id,
      username: updatedUser.username,
      role: updatedUser.role,
      name: updatedUser.name,
      email: updatedUser.email,
    },
  });
});

// Admin: Delete user
server.delete("/api/admin/users/:id", authenticate, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  const db = router.db;
  const user = db.get("users").find({ id: req.params.id }).value();

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  db.get("users").remove({ id: req.params.id }).write();

  res.json({ message: "User deleted successfully" });
});

// Admin: Get user's attendance
server.get("/api/admin/attendance/:username", authenticate, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  const db = router.db;
  const userAttendance = db
    .get("attendance")
    .filter({ userId: req.params.username })
    .value();

  res.json(userAttendance);
});

// Admin: Get all leave requests
server.get("/api/admin/leaves", authenticate, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  const db = router.db;
  const { status, userId } = req.query;

  let leaves = db.get("leaves");

  if (status) {
    leaves = leaves.filter({ status });
  }

  if (userId) {
    leaves = leaves.filter({ userId });
  }

  res.json(leaves.value());
});

// Admin: Approve/Reject leave request
server.patch("/api/admin/leaves/:id", authenticate, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  const { status, rejectionReason } = req.body;

  if (!status || !["Approved", "Rejected"].includes(status)) {
    return res
      .status(400)
      .json({ error: "Valid status (Approved/Rejected) is required" });
  }

  const db = router.db;
  const leave = db.get("leaves").find({ id: req.params.id }).value();

  if (!leave) {
    return res.status(404).json({ error: "Leave request not found" });
  }

  const updates = {
    status,
    reviewedBy: req.user.username,
    reviewedAt: new Date().toISOString(),
  };

  if (status === "Rejected" && rejectionReason) {
    updates.rejectionReason = rejectionReason;
  }

  db.get("leaves").find({ id: req.params.id }).assign(updates).write();

  const updatedLeave = db.get("leaves").find({ id: req.params.id }).value();

  res.json({
    message: `Leave request ${status.toLowerCase()} successfully`,
    leave: updatedLeave,
  });
});

// Use default router for other routes
server.use("/api", router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`🚀 Mock API Server is running!`);
  console.log(`${"=".repeat(60)}`);
  console.log(`📍 Server URL:        http://localhost:${PORT}`);
  console.log(`📍 API Base URL:      http://localhost:${PORT}/api`);
  console.log(`📚 Swagger Docs:      http://localhost:${PORT}/api-docs`);
  console.log(`${"=".repeat(60)}\n`);
});
