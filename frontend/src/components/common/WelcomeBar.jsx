import React from 'react'
import { Card } from '../ui/card';

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
    <Card className='m-5'>
      <div className=" px-5 py-0 justify-between   flex items-center ">
        <div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-lg">{user?.name || "Guest"}</p>
        </div>

        <div className="text-lg">
          <p>{formattedDate}</p>
        </div>
      </div>
    </Card>
  );
};

export default WelcomeBar;
