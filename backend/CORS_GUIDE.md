# CORS Configuration Guide

## What is CORS?

CORS (Cross-Origin Resource Sharing) is a security feature that controls which domains can access your API. By default, browsers block requests from one domain to another for security reasons.

## Our Configuration

This API server is configured to **allow ALL origins**, making it perfect for development and testing.

### Current Settings

```javascript
{
  origin: '*',                    // Allow requests from ANY domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}
```

## What This Means

✅ **Your React app can connect from anywhere:**
- `http://localhost:3000` ✓
- `http://localhost:5173` (Vite default) ✓
- `http://localhost:8080` ✓
- `https://yourapp.com` ✓
- Any other domain ✓

✅ **All HTTP methods are allowed:**
- GET, POST, PUT, DELETE, PATCH, OPTIONS

✅ **Required headers are allowed:**
- Content-Type (for JSON)
- Authorization (for Bearer tokens)

## Testing CORS

### From React App

```javascript
// This will work from ANY domain
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// No CORS errors! 🎉
api.post('/login', { username: 'admin', password: 'admin_' });
```

### From Different Ports

Your API runs on port 3001, React might run on:
- **Vite**: 5173
- **Create React App**: 3000
- **Next.js**: 3000

All will work without CORS issues! ✅

### From Browser Fetch

```javascript
// Test from browser console on ANY website
fetch('http://localhost:3001/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'admin_' })
})
.then(res => res.json())
.then(data => console.log(data));
```

## Common CORS Scenarios

### Scenario 1: React App on Different Port
```
React App:  http://localhost:5173
API Server: http://localhost:3001
Result: ✅ Works perfectly!
```

### Scenario 2: Deployed Frontend
```
React App:  https://myapp.netlify.app
API Server: http://localhost:3001
Result: ✅ Works (but use HTTPS in production)
```

### Scenario 3: Multiple Developers
```
Developer 1: http://localhost:3000
Developer 2: http://localhost:5173
Developer 3: http://192.168.1.100:3000
Result: ✅ All work simultaneously!
```

## Troubleshooting CORS Issues

### Issue: Still Getting CORS Error?

**Check 1: Is the API server running?**
```bash
# You should see this:
📍 Server URL:        http://localhost:3001
```

**Check 2: Are you using the correct URL?**
```javascript
// ✅ Correct
baseURL: 'http://localhost:3001/api'

// ❌ Wrong - missing /api
baseURL: 'http://localhost:3001'

// ❌ Wrong - https instead of http
baseURL: 'https://localhost:3001/api'
```

**Check 3: Check browser console**
```
If you see: "Access-Control-Allow-Origin"
Then: CORS is the issue

If you see: "Network Error" or "Failed to fetch"
Then: Server might not be running
```

### Issue: Preflight Request Failed

The browser sends an OPTIONS request first (preflight):
- ✅ Our server handles this automatically
- If it still fails, restart both servers

### Issue: Credentials Not Working

```javascript
// If using cookies or credentials
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true  // Add this if needed
});
```

## Production Considerations

### ⚠️ Security Warning

Current configuration (`origin: '*'`) is **great for development** but **not recommended for production**.

### For Production Deployment

Update `server.js` to allow only your frontend domain:

```javascript
// Instead of origin: '*'
const corsOptions = {
  origin: ['https://yourapp.com', 'https://www.yourapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
```

### Environment-Based Configuration

```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourapp.com']  // Production domain
    : '*',                      // Development - allow all
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
```

## Testing CORS Configuration

### Test 1: Simple Fetch (Any Browser Console)

```javascript
fetch('http://localhost:3001/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'admin_' })
})
.then(r => r.json())
.then(d => console.log('✅ CORS working!', d))
.catch(e => console.error('❌ CORS error:', e));
```

### Test 2: With Authorization Header

```javascript
// First get token
const token = 'your_token_here';

fetch('http://localhost:3001/api/attendance/me', {
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(d => console.log('✅ Authorized request working!', d));
```

### Test 3: From React App

```javascript
// App.js or any component
import { useEffect } from 'react';
import axios from 'axios';

function CorsTest() {
  useEffect(() => {
    axios.post('http://localhost:3001/api/login', {
      username: 'admin',
      password: 'admin_'
    })
    .then(res => {
      console.log('✅ CORS is working!', res.data);
      alert('CORS is working! Check console.');
    })
    .catch(err => {
      console.error('❌ CORS error:', err);
      alert('CORS error! Check console.');
    });
  }, []);

  return <div>Check console for CORS test results</div>;
}
```

## Advanced CORS Options

### Allow Specific Headers

```javascript
allowedHeaders: [
  'Content-Type',
  'Authorization',
  'X-Custom-Header',      // Add custom headers
  'X-Requested-With'
]
```

### Expose Headers to Client

```javascript
exposedHeaders: [
  'X-Total-Count',        // Expose custom response headers
  'X-Auth-Token'
]
```

### Set Max Age for Preflight Cache

```javascript
maxAge: 86400  // Cache preflight response for 24 hours
```

## Common Questions

### Q: Why use `origin: '*'` ?
**A:** Perfect for development. Any frontend can connect. Simplifies testing.

### Q: Is it secure?
**A:** For local development, yes! For production, restrict to your domain.

### Q: Can multiple students use the same API?
**A:** Yes! Each student's React app can connect regardless of port or domain.

### Q: What if I'm using a mobile app?
**A:** Mobile apps don't have CORS restrictions. This configuration works fine.

### Q: Does Swagger UI work with CORS?
**A:** Yes! Swagger UI is served from the same origin, so no CORS issues.

## Quick Reference

| Configuration | Value | Why |
|--------------|-------|-----|
| `origin` | `'*'` | Allow all domains |
| `methods` | `GET, POST, PUT, DELETE, PATCH, OPTIONS` | All REST methods |
| `allowedHeaders` | `Content-Type, Authorization` | For JSON + Auth |
| `credentials` | `true` | Allow cookies/credentials |

## Summary

✅ **Current Setup**: CORS is fully open for easy development
✅ **Any React app can connect**: No configuration needed
✅ **All HTTP methods work**: GET, POST, PUT, DELETE, PATCH
✅ **Authorization headers allowed**: Bearer tokens work perfectly
✅ **Multiple developers**: Everyone can test simultaneously
✅ **Production ready**: Easy to restrict when deploying

---

**No CORS headaches for your interns! 🎉**

They can focus on learning React instead of debugging CORS issues.
