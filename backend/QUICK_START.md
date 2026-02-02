# 🚀 Quick Start Guide for Interns

## What You're Getting

A fully functional mock API server that simulates a real backend for your Attendance Management System React project. No need to write backend code - just connect your React app to this API!

## Installation (5 minutes)

### Step 1: Extract the Files
Extract the provided ZIP file to your desired location.

### Step 2: Open Terminal
Navigate to the project folder:
```bash
cd attendance-mock-api
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Start the Server
```bash
npm start
```

You should see:
```
Mock API Server is running on http://localhost:3001
API endpoints available at http://localhost:3001/api
```

✅ **Your API is now ready!**

## Test It Works

### Option 1: Swagger UI (Easiest!)
1. Open your browser and go to:
   ```
   http://localhost:3001/api-docs
   ```
2. You'll see an interactive API documentation
3. Click on "POST /login" → "Try it out"
4. Use credentials: `admin` / `admin_`
5. Click "Execute" and you'll get a token!
6. Click "Authorize" button at top, paste the token
7. Now you can test ALL endpoints interactively!

### Option 2: Browser
Open your browser and go to:
```
http://localhost:3001/api/login
```
You should see a message about POST method required.

### Option 2: Quick cURL Test
```bash
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin_"}'
```

You should get a token response!

## Using with Your React App

### 1. Create Your React App
```bash
npm create vite@latest attendance-frontend -- --template react
cd attendance-frontend
npm install
```

### 2. Install Required Packages
```bash
npm install axios react-router-dom react-toastify react-datepicker
npm install -D tailwindcss postcss autoprefixer
```

### 3. Create API Service File

Create `src/services/api.js`:
```javascript
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

### 4. Test Login from React

Create a simple login component:
```javascript
import { useState } from 'react';
import api from './services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      console.log(response.data);
    } catch (error) {
      alert('Login failed: ' + error.response?.data?.error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

## Test Accounts

**Admin:**
- Username: `admin`
- Password: `admin_`

**Users:**
- Username: `john_doe` | Password: `password123`
- Username: `jane_smith` | Password: `password123`
- Username: `bob_wilson` | Password: `password123`

## Important Files

📄 **QUICK_START.md** - This file (you're reading it!)
📄 **README.md** - Complete project documentation  
📄 **API_DOCUMENTATION.md** - All API endpoints with examples
📄 **SWAGGER_GUIDE.md** - Interactive API testing tutorial
📄 **CORS_GUIDE.md** - CORS configuration and troubleshooting
📄 **swagger.json** - OpenAPI specification for Swagger UI
📄 **server.js** - The actual server code
📄 **db.json** - Your database (can edit this!)
📄 **Attendance_API.postman_collection.json** - Import into Postman for testing

## Testing Your API - Three Ways!

### 1. Swagger UI (Best for Beginners) ⭐
- Visit: `http://localhost:3001/api-docs`
- Interactive interface - no tools needed
- Test everything in your browser
- See request/response in real-time

### 2. Postman (Professional Testing)
- Import `Attendance_API.postman_collection.json`
- Pre-configured requests ready to use
- Great for saving test scenarios

### 3. React App (Production Use)
- Use the axios examples from README.md
- Integrate directly into your frontend

## Common Issues & Solutions

### Port 3001 Already in Use
```bash
# Change port in server.js or use:
PORT=4000 npm start
```

### Can't Connect from React
Make sure:
1. API server is running (`npm start` in API folder)
2. Using correct URL: `http://localhost:3001/api`
3. React app is on different port (usually 5173)

### CORS Errors
**No CORS errors!** This server is configured to accept requests from anywhere:
- ✅ Any React app on any port
- ✅ Any frontend framework
- ✅ Multiple developers simultaneously
- ✅ Local and deployed apps

If you somehow still see CORS errors:
1. Restart both servers (API and React)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check you're using `http://` not `https://`
4. Make sure API is running on port 3001

📖 **Need help?** Check `CORS_GUIDE.md` for complete CORS documentation and testing examples.

## Development Workflow

1. **Keep API server running** in one terminal
2. **Run React app** in another terminal
3. **Make changes** to your React code
4. **Test with API** - all data persists in db.json

## Next Steps

1. ✅ API is running
2. 📖 Read API_DOCUMENTATION.md
3. 🔧 Build your React components
4. 🧪 Test with provided accounts
5. 🚀 Implement all features from the requirements

## Tips

- Use browser DevTools Network tab to debug API calls
- Check server terminal for API logs
- Modify db.json to add test data
- Use Postman collection for quick API testing

## Need Help?

1. Check API_DOCUMENTATION.md for endpoint details
2. Look at the example code in README.md
3. Test endpoints using Postman first
4. Check server logs for error messages

---

**Happy Coding! 🎉**

Remember: The API handles all the backend logic - you just focus on building an awesome React UI!
