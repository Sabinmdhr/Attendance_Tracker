import React from 'react'

const WelcomeBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
 const today = new Date();
 const formattedDate = today.toLocaleDateString("en-US", {
   weekday: "long",
   year: "numeric",
   month: "long",
   day: "numeric",
 });
  return (
    <div className=" px-8 py-5 justify-between   flex items-center border-b border-gray-300 shadow-md m-5">
      <div>
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-lg">{user?.name || "Guest"}</p>
      </div>

      <div className="text-lg">
        <p>{formattedDate}</p>
      </div>
    </div>
  );
}

export default WelcomeBar