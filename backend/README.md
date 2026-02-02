# Attendance Management System - Mock API Server

A fully functional mock REST API server for the Attendance Management System project. Built with JSON Server and custom middleware to simulate a real backend with authentication, role-based access control, and business logic.

## Features

✅ **Authentication System**
- Login with username/password
- Token-based authentication
- Role-based access control (Admin & User)

✅ **CORS Enabled**
- Works with ANY frontend (React, Vue, Angular)
- No CORS errors during development
- Connect from any port or domain
- Multiple developers can test simultaneously

✅ **Interactive API Documentation (Swagger)**
- Visual API explorer at `/api-docs`
- Test endpoints directly from browser
- See real-time request/response examples
- No Postman needed for testing!

✅ **User Features**
- Mark daily attendance (once per day validation)
- View attendance history
- Get attendance statistics
- Create/Update/Delete leave requests
- View own leave requests

✅ **Admin Features**
- User management (CRUD operations)
- View any user's attendance
- Manage all leave requests
- Approve/Reject leave requests with optional reasons

✅ **Business Logic**
- Attendance can only be marked once per day
- Only pending leaves can be edited/deleted by users
- Proper authorization checks
- Input validation

## Quick Start

### 1. Installation

```bash
npm install
```

### 2. Start the Server

```bash
# Production mode
npm start

# Development mode (auto-restart on changes)
npm run dev
```

The server will start on **http://localhost:3001**

### 3. Access Swagger Documentation

Open your browser and navigate to:
```
http://localhost:3001/api-docs
```

You'll see an interactive API documentation interface where you can:
- View all available endpoints
- Test API calls directly from the browser
- See request/response examples
- Try authentication and protected endpoints

### 4. Test the API

Open your browser or API testing tool (Postman, Thunder Client) and navigate to:
```
http://localhost:3001/api/login
```

## Default Accounts

### Admin Account
```
Username: admin
Password: admin_
```

### Test User Accounts
```
Username: john_doe    | Password: password123
Username: jane_smith  | Password: password123
Username: bob_wilson  | Password: password123
```

## Project Structure

```
attendance-mock-api/
├── server.js                          # Main server with custom routes and middleware
├── db.json                            # Database file (auto-updated)
├── swagger.json                       # OpenAPI/Swagger specification
├── package.json                       # Dependencies and scripts
├── README.md                          # This file
├── QUICK_START.md                     # 5-minute setup guide
├── API_DOCUMENTATION.md               # Complete API documentation
├── SWAGGER_GUIDE.md                   # Swagger UI tutorial
├── CORS_GUIDE.md                      # CORS configuration & troubleshooting
├── Attendance_API.postman_collection.json  # Postman testing collection
└── .gitignore                         # Git ignore rules
```

## API Endpoints Overview

### Public Endpoints
- `POST /api/login` - Login and get authentication token

### User Endpoints (Authenticated)
- `POST /api/attendance` - Mark attendance for today
- `GET /api/attendance/me` - Get own attendance history
- `GET /api/attendance/stats` - Get attendance statistics
- `GET /api/leaves/me` - Get own leave requests
- `POST /api/leaves` - Create leave request
- `PUT /api/leaves/:id` - Update pending leave request
- `DELETE /api/leaves/:id` - Delete pending leave request

### Admin Endpoints (Admin Only)
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/attendance/:username` - Get user's attendance
- `GET /api/admin/leaves` - Get all leave requests (with filters)
- `PATCH /api/admin/leaves/:id` - Approve/Reject leave request

📖 **See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed endpoint documentation with request/response examples.**

## How to Use with React

### 1. Configure Axios

```javascript
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 2. Create useAuth Hook

```javascript
// src/hooks/useAuth.js
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await api.post('/login', { username, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    setUser(response.data.user);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

### 3. Example Component

```javascript
// Example: Mark Attendance Component
import { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const MarkAttendance = () => {
  const [loading, setLoading] = useState(false);

  const markAttendance = async () => {
    setLoading(true);
    try {
      const response = await api.post('/attendance');
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to mark attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={markAttendance} disabled={loading}>
      {loading ? 'Marking...' : 'Mark Present'}
    </button>
  );
};
```

## Testing the API

### Using cURL

```bash
# Login
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin_"}'

# Mark Attendance (replace TOKEN with actual token)
curl -X POST http://localhost:3001/api/attendance \
  -H "Authorization: Bearer TOKEN"

# Get User's Attendance
curl -X GET http://localhost:3001/api/attendance/me \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman/Thunder Client

1. **Login:**
   - Method: POST
   - URL: `http://localhost:3001/api/login`
   - Body: `{"username":"admin","password":"admin_"}`
   - Copy the token from response

2. **Test Other Endpoints:**
   - Add header: `Authorization: Bearer <token>`
   - Make requests to any endpoint

## Customization

### Adding New Users

Edit `db.json` and add to the users array:

```json
{
  "id": "5",
  "username": "new_user",
  "password": "password",
  "role": "user",
  "name": "New User",
  "email": "new@example.com"
}
```

### Modifying Sample Data

Edit `db.json` to add/modify attendance records, leave requests, etc.

### Changing Port

Set environment variable or edit server.js:

```bash
PORT=4000 npm start
```

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 3001 (Linux/Mac)
lsof -ti:3001 | xargs kill -9

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### CORS Issues
**Good news!** This server has CORS fully configured to accept requests from ANY origin. 

If you still encounter CORS errors:
1. ✅ **Restart both servers** (API and React app)
2. ✅ **Check the URL** - Use `http://localhost:3001/api` (not https)
3. ✅ **Verify server is running** - You should see the startup message
4. ✅ **Clear browser cache** - Sometimes old CORS policies are cached
5. ✅ **Check browser console** - Look for specific error messages

**Still having issues?** See `CORS_GUIDE.md` for detailed troubleshooting and testing steps.

### Token Invalid
Clear localStorage and login again:
```javascript
localStorage.clear();
```

## Features for Interns to Implement

This mock API supports all the requirements from the project specification:

- ✅ Role-based authentication
- ✅ Protected routes (implement in React Router)
- ✅ Attendance marking with validation
- ✅ Leave request CRUD operations
- ✅ Admin user management
- ✅ Confirmation modals (implement in React)
- ✅ Loading states (use provided loading flags)
- ✅ Error handling (use error responses)
- ✅ Toast notifications (use react-toastify)

## Technologies Used

- **json-server** - Mock REST API
- **Node.js** - Runtime environment
- **Custom Middleware** - Authentication & business logic

## License

MIT - Free to use for educational purposes

## Support

For issues or questions:
1. Check API_DOCUMENTATION.md for detailed endpoint info
2. Verify server is running on correct port
3. Check network tab in browser DevTools
4. Ensure proper authentication headers

---

**Happy Coding! 🚀**
