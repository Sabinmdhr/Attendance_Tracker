import React from 'react'

const Login = () => {
  return (
    <div className="bg-gray-300 h-screen flex ">
      <div className="bg-amber-200 w-3/4">ddd</div>
      <div className="bg-yellow-600 w-1/2">
        <form action="" className="p-20">
          <div className="flex flex-col">
            <select name="role" id="">
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <label htmlFor="userName">User Name:</label>
            <input
              className="border border-gray-300 rounded px-3 py-2"
              type="text"
              name="userName"
            />
            <label htmlFor="password">Password:</label>
            <input
              className="border border-gray-300 rounded px-3 py-2"
              type="password"
              name="password"
            />
          </div>
          <div className='flex flex-col '>
            <button className='p-4' type="button">Forget password</button>
            <button className='p-4 border border-blue-500 w-1/2 ' type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login