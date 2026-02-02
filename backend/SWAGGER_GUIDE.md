# 📚 Swagger UI Guide - Testing APIs Made Easy

## What is Swagger?

Swagger UI is an interactive API documentation tool that lets you:
- ✅ View all API endpoints in one place
- ✅ Test API calls directly from your browser
- ✅ See request/response examples
- ✅ No need for Postman or cURL commands
- ✅ Perfect for learning and testing APIs

## Accessing Swagger UI

1. **Start your API server**:
   ```bash
   npm start
   ```

2. **Open Swagger in your browser**:
   ```
   http://localhost:3001/api-docs
   ```

You'll see a beautiful interface with all your API endpoints organized by category!

## Step-by-Step Tutorial

### Step 1: Understanding the Interface

When you open Swagger UI, you'll see:
- **Top Section**: API title and description
- **Authorize Button**: For adding your authentication token
- **Endpoint Sections**: Grouped by functionality (Authentication, User, Admin)
- **Colored Tags**: Different HTTP methods (POST, GET, PUT, DELETE, PATCH)

### Step 2: Login and Get Your Token

1. **Find the Login Endpoint**:
   - Scroll to "Authentication" section
   - Click on `POST /login`

2. **Expand the Endpoint**:
   - The section expands showing details

3. **Try It Out**:
   - Click the "Try it out" button (top right)
   - The request body becomes editable

4. **Enter Credentials**:
   ```json
   {
     "username": "admin",
     "password": "admin_"
   }
   ```
   Or use the example dropdown to auto-fill!

5. **Execute**:
   - Click the blue "Execute" button
   - Wait a moment...
   - See the response below!

6. **Copy Your Token**:
   - In the response, you'll see a `token` field
   - Copy the entire token value (long string of characters)
   - Example: `YWRtaW46YWRtaW46MTcwNzMyNDUwMDAwMA==`

### Step 3: Authorize Swagger

1. **Click the "Authorize" Button**:
   - Located at the top right of the page
   - It has a lock icon 🔒

2. **Paste Your Token**:
   - In the "Value" field, paste your token
   - **Important**: Just paste the token, don't add "Bearer" - Swagger adds it automatically!

3. **Click "Authorize"**:
   - Then click "Close"
   - You're now authenticated! 🎉
   - The lock icon should now be closed/filled

### Step 4: Test User Endpoints

Now you can test any endpoint! Let's try marking attendance:

1. **Find the Endpoint**:
   - Go to "User - Attendance" section
   - Click on `POST /attendance`

2. **Try It Out**:
   - Click "Try it out"
   - No request body needed for this endpoint

3. **Execute**:
   - Click "Execute"
   - See the response!

**Expected Response**:
```json
{
  "message": "Attendance marked successfully",
  "attendance": {
    "id": "7",
    "userId": "admin",
    "date": "2026-02-02",
    "status": "Present",
    "timestamp": "2026-02-02T10:30:00.000Z"
  }
}
```

### Step 5: Test Admin Endpoints

Let's create a new user (admin only):

1. **Find the Endpoint**:
   - Go to "Admin - Users" section
   - Click on `POST /admin/users`

2. **Try It Out**:
   - Click "Try it out"

3. **Enter User Data**:
   ```json
   {
     "username": "test_intern",
     "password": "intern123",
     "role": "user",
     "name": "Test Intern",
     "email": "intern@example.com"
   }
   ```

4. **Execute**:
   - Click "Execute"
   - New user created! ✅

### Step 6: Test with Query Parameters

Let's filter leave requests:

1. **Find the Endpoint**:
   - Go to "Admin - Leaves" section
   - Click on `GET /admin/leaves`

2. **Try It Out**:
   - Click "Try it out"

3. **Add Filters** (optional):
   - Status: Select "Pending" from dropdown
   - userId: Enter "john_doe"

4. **Execute**:
   - Click "Execute"
   - See filtered results!

## Understanding Response Codes

Swagger shows you the HTTP status codes:

- 🟢 **200-201**: Success! Your request worked
- 🟡 **400**: Bad Request - Check your input data
- 🔴 **401**: Unauthorized - Your token is missing or invalid
- 🔴 **403**: Forbidden - You don't have permission (need admin)
- 🔴 **404**: Not Found - The resource doesn't exist

## Common Swagger Operations

### Testing Different HTTP Methods

**GET** (Green) - Retrieve data
- Just click "Execute"
- No request body needed

**POST** (Blue) - Create new data
- Fill in the request body
- Click "Execute"

**PUT** (Orange) - Update existing data
- Need the ID in the path
- Fill in the request body

**DELETE** (Red) - Remove data
- Need the ID in the path
- Click "Execute"

**PATCH** (Teal) - Partial update
- Need the ID in the path
- Only update specific fields

### Using Path Parameters

For endpoints like `DELETE /admin/users/{id}`:

1. **Try it out**
2. **Enter the ID**: Replace `{id}` with actual ID (e.g., "2")
3. **Execute**

### Using Query Parameters

For endpoints like `GET /admin/leaves?status=Pending`:

1. **Try it out**
2. **Fill in the query fields** (optional)
3. **Execute**

## Pro Tips

### 1. Use the Examples
- Most endpoints have example values
- Click the dropdown to auto-fill

### 2. Check the Models
- Scroll down in any endpoint
- See "Schemas" section
- Understand the data structure

### 3. Copy cURL Commands
- After executing, scroll to "Curl" tab
- Copy the command for terminal use

### 4. Test Error Cases
- Try invalid data to see error responses
- Helps you handle errors in your React app

### 5. Save Token for Session
- Token works until you restart server
- Don't need to re-authenticate every time
- Just click "Authorize" once

## Testing Workflow Example

Here's a complete workflow to test the system:

```
1. Login (POST /login) → Get token
2. Authorize → Paste token
3. Mark Attendance (POST /attendance)
4. View My Attendance (GET /attendance/me)
5. Get Stats (GET /attendance/stats)
6. Create Leave Request (POST /leaves)
7. View My Leaves (GET /leaves/me)

For Admin:
8. Switch to admin token (login as admin)
9. Get All Users (GET /admin/users)
10. View User Attendance (GET /admin/attendance/{username})
11. Get All Leaves (GET /admin/leaves)
12. Approve Leave (PATCH /admin/leaves/{id})
```

## Troubleshooting

### "Authorization header missing"
- You need to click "Authorize" first
- Paste your token from login response

### "Invalid token"
- Token might be expired (restart server)
- Get a new token by logging in again

### "Admin access required"
- You're using a user token for admin endpoint
- Login as admin (admin/admin_) to get admin token

### "Attendance already marked"
- You can only mark once per day
- Try again tomorrow or delete the entry from db.json

### Can't see the Swagger UI
- Make sure server is running (`npm start`)
- Check the URL: `http://localhost:3001/api-docs`
- Try refreshing the page

## Benefits of Using Swagger

### For Learning:
- ✅ See all available endpoints at once
- ✅ Understand request/response structure
- ✅ Learn API best practices

### For Testing:
- ✅ No need to write code to test
- ✅ Instant feedback
- ✅ Try different scenarios quickly

### For Development:
- ✅ Test before writing React code
- ✅ Verify API behavior
- ✅ Debug issues easily

### For Documentation:
- ✅ Always up-to-date
- ✅ Share with team members
- ✅ Professional presentation

## Next Steps

1. ✅ Practice with all endpoints
2. ✅ Test different user scenarios
3. ✅ Try error cases
4. ✅ Take screenshots for documentation
5. ✅ Start building your React app with confidence!

## Additional Resources

- **API Documentation**: See `API_DOCUMENTATION.md` for detailed endpoint info
- **Postman Collection**: `Attendance_API.postman_collection.json` for advanced testing
- **Server Code**: `server.js` to understand backend logic

---

**Happy Testing! 🚀**

Remember: Swagger UI is your best friend for learning and testing APIs. Take your time to explore each endpoint!
