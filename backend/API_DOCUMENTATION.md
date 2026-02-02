# Attendance Management System - Mock API Documentation

## Getting Started

### Installation

```bash
npm install
```

### Running the Server

```bash
# Production mode
npm start

# Development mode (with auto-restart)
npm run dev
```

The server will start on `http://localhost:3001`

### 📚 Interactive API Documentation (Swagger UI)

**Recommended for Testing!**

Open your browser and navigate to:
```
http://localhost:3001/api-docs
```

You'll get:
- ✅ Visual, interactive API explorer
- ✅ Test all endpoints directly from browser
- ✅ No need for Postman or cURL
- ✅ See real-time request/response examples
- ✅ Built-in authentication support

**Quick Start with Swagger**:
1. Go to `http://localhost:3001/api-docs`
2. Click on `POST /login` → "Try it out"
3. Use credentials: admin/admin_
4. Copy the token from response
5. Click "Authorize" button at top
6. Paste token and click "Authorize"
7. Now test any endpoint!

See `SWAGGER_GUIDE.md` for detailed Swagger tutorial.

---

## Default Credentials

### Admin Account
- **Username:** `admin`
- **Password:** `admin_`

### User Accounts
- **Username:** `john_doe` | **Password:** `password123`
- **Username:** `jane_smith` | **Password:** `password123`
- **Username:** `bob_wilson` | **Password:** `password123`

---

## API Endpoints

### Base URL
```
http://localhost:3001/api
```

---

## Authentication Endpoints

### Login
**POST** `/api/login`

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin_"
}
```

**Response (200):**
```json
{
  "token": "base64_encoded_token",
  "user": {
    "id": "1",
    "username": "admin",
    "role": "admin",
    "name": "Administrator",
    "email": "admin@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

**Note:** Store the token in localStorage and include it in all subsequent requests as:
```
Authorization: Bearer {token}
```

---

## User Endpoints (Requires Authentication)

### Mark Attendance
**POST** `/api/attendance`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (201):**
```json
{
  "message": "Attendance marked successfully",
  "attendance": {
    "id": "7",
    "userId": "john_doe",
    "date": "2026-02-02",
    "status": "Present",
    "timestamp": "2026-02-02T09:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Attendance already marked for today"
}
```

---

### Get Own Attendance
**GET** `/api/attendance/me`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
[
  {
    "id": "1",
    "userId": "john_doe",
    "date": "2026-01-15",
    "status": "Present",
    "timestamp": "2026-01-15T09:30:00Z"
  },
  {
    "id": "2",
    "userId": "john_doe",
    "date": "2026-01-16",
    "status": "Present",
    "timestamp": "2026-01-16T09:15:00Z"
  }
]
```

---

### Get Attendance Statistics
**GET** `/api/attendance/stats`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "totalDays": 10,
  "presentDays": 8,
  "absentDays": 2,
  "percentage": 80.00
}
```

---

### Get Own Leave Requests
**GET** `/api/leaves/me`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
[
  {
    "id": "1",
    "userId": "john_doe",
    "startDate": "2026-02-10",
    "endDate": "2026-02-12",
    "reason": "Medical appointment",
    "status": "Pending",
    "createdAt": "2026-01-20T10:00:00Z"
  }
]
```

---

### Create Leave Request
**POST** `/api/leaves`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "startDate": "2026-02-20",
  "endDate": "2026-02-22",
  "reason": "Family function"
}
```

**Response (201):**
```json
{
  "message": "Leave request created successfully",
  "leave": {
    "id": "4",
    "userId": "john_doe",
    "startDate": "2026-02-20",
    "endDate": "2026-02-22",
    "reason": "Family function",
    "status": "Pending",
    "createdAt": "2026-02-02T10:00:00.000Z"
  }
}
```

---

### Update Leave Request
**PUT** `/api/leaves/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "startDate": "2026-02-21",
  "endDate": "2026-02-23",
  "reason": "Updated: Family function"
}
```

**Response (200):**
```json
{
  "message": "Leave request updated successfully",
  "leave": {
    "id": "4",
    "userId": "john_doe",
    "startDate": "2026-02-21",
    "endDate": "2026-02-23",
    "reason": "Updated: Family function",
    "status": "Pending",
    "createdAt": "2026-02-02T10:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Can only update pending leave requests"
}
```

---

### Delete Leave Request
**DELETE** `/api/leaves/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Leave request deleted successfully"
}
```

**Error Response (400):**
```json
{
  "error": "Can only delete pending leave requests"
}
```

---

## Admin Endpoints (Requires Admin Role)

### Get All Users
**GET** `/api/admin/users`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response (200):**
```json
[
  {
    "id": "1",
    "username": "admin",
    "role": "admin",
    "name": "Administrator",
    "email": "admin@example.com"
  },
  {
    "id": "2",
    "username": "john_doe",
    "role": "user",
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

---

### Create User
**POST** `/api/admin/users`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Request Body:**
```json
{
  "username": "new_user",
  "password": "password123",
  "role": "user",
  "name": "New User",
  "email": "newuser@example.com"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "5",
    "username": "new_user",
    "role": "user",
    "name": "New User",
    "email": "newuser@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Username already exists"
}
```

---

### Update User
**PUT** `/api/admin/users/:id`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "role": "user"
}
```

**Response (200):**
```json
{
  "message": "User updated successfully",
  "user": {
    "id": "2",
    "username": "john_doe",
    "role": "user",
    "name": "Updated Name",
    "email": "updated@example.com"
  }
}
```

---

### Delete User
**DELETE** `/api/admin/users/:id`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

---

### Get User's Attendance (by username)
**GET** `/api/admin/attendance/:username`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response (200):**
```json
[
  {
    "id": "1",
    "userId": "john_doe",
    "date": "2026-01-15",
    "status": "Present",
    "timestamp": "2026-01-15T09:30:00Z"
  }
]
```

---

### Get All Leave Requests
**GET** `/api/admin/leaves?status=Pending&userId=john_doe`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Query Parameters:**
- `status` (optional): Filter by status (Pending, Approved, Rejected)
- `userId` (optional): Filter by username

**Response (200):**
```json
[
  {
    "id": "1",
    "userId": "john_doe",
    "startDate": "2026-02-10",
    "endDate": "2026-02-12",
    "reason": "Medical appointment",
    "status": "Pending",
    "createdAt": "2026-01-20T10:00:00Z"
  }
]
```

---

### Approve/Reject Leave Request
**PATCH** `/api/admin/leaves/:id`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Request Body (Approve):**
```json
{
  "status": "Approved"
}
```

**Request Body (Reject):**
```json
{
  "status": "Rejected",
  "rejectionReason": "Insufficient notice period"
}
```

**Response (200):**
```json
{
  "message": "Leave request approved successfully",
  "leave": {
    "id": "1",
    "userId": "john_doe",
    "startDate": "2026-02-10",
    "endDate": "2026-02-12",
    "reason": "Medical appointment",
    "status": "Approved",
    "createdAt": "2026-01-20T10:00:00Z",
    "reviewedBy": "admin",
    "reviewedAt": "2026-02-02T10:00:00.000Z"
  }
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```
or
```json
{
  "error": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 400 Bad Request
```json
{
  "error": "Error message describing the issue"
}
```

---

## React Integration Example

### Setting up Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Custom Hook Example (useApi)

```javascript
import { useState } from 'react';
import api from './api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (method, url, data = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api[method](url, data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      setLoading(false);
      throw err;
    }
  };

  return { loading, error, request };
};
```

### Usage in Components

```javascript
// Login
const { request, loading, error } = useApi();

const handleLogin = async (username, password) => {
  try {
    const data = await request('post', '/login', { username, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    // Navigate to dashboard
  } catch (err) {
    console.error('Login failed:', err);
  }
};

// Mark Attendance
const handleMarkAttendance = async () => {
  try {
    const data = await request('post', '/attendance');
    toast.success(data.message);
  } catch (err) {
    toast.error(error);
  }
};

// Get Leave Requests
const fetchLeaves = async () => {
  try {
    const leaves = await request('get', '/leaves/me');
    setLeaves(leaves);
  } catch (err) {
    console.error('Failed to fetch leaves:', err);
  }
};
```

---

## Notes

1. **Authentication**: All endpoints except `/api/login` require a valid token in the Authorization header.

2. **Attendance Logic**: Users can only mark attendance once per day. Subsequent attempts will return an error.

3. **Leave Request Restrictions**: 
   - Users can only update/delete their own pending leave requests
   - Approved or Rejected leaves cannot be modified by users

4. **Admin Privileges**: Admin endpoints return 403 Forbidden if accessed with a non-admin token.

5. **Data Persistence**: The database is stored in `db.json` and persists between server restarts.

6. **CORS**: The server has CORS enabled by default through json-server middlewares.

---

## Tips for Development

1. Use tools like Postman or Thunder Client (VS Code extension) to test endpoints
2. Check the console for detailed server logs
3. The `db.json` file can be manually edited to add/modify data
4. Use `nodemon` for development to auto-restart on file changes
5. Install React DevTools and Axios DevTools for easier debugging
