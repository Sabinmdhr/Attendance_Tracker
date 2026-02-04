import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AttendanceChart from '@/components/AttendanceChart';
import { Calendar } from '@/components/ui/calendar';
import api from '@/lib/api';
import AttendanceCalendar from '@/components/attendance/AttendanceCalendar';
import LeaveCard from '@/components/users/LeaveCard';
const Dashboard = () => {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
 const today = new Date();
 const formattedDate = today.toLocaleDateString("en-US", {
   weekday: "long",
   year: "numeric",
   month: "long",
   day: "numeric",
 });

const presentDates = [
  new Date(2026, 1, 3), // Feb 3
  new Date(2026, 1, 5), // Feb 5
  new Date(2026, 1, 10), // Feb 10
];

useEffect(() =>{
  // const storedUser = localStorage.getItem("user");
  // if(storedUser){
  //   setUser (JSON.parse(storedUser));
  // }

 const fetchStats = async () => {
   try {
     const token = localStorage.getItem("token");
     const user = JSON.parse(localStorage.getItem("user"));

     if (!token || !user) {
       setError("User not logged in");
       setLoading(false);
       return;
     }

     // Call backend stats endpoint
     const res = await api.get("/attendance/stats", {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });

     setStats(res.data);
     setLoading(false);
   } catch (err) {
     console.error("Error fetching stats:", err.response?.data || err.message);
     setError("Failed to fetch attendance stats");
     setLoading(false);
   }
 };

 fetchStats();


},[]);


  if (loading) return <p>Loading attendance stats...</p>;

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <div className=" px-8 py-5 justify-between   flex items-center border-b border-gray-300 shadow-md m-5">
        <div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-lg">{user?.name || "Guest"}</p>

        </div>

        <div className="text-lg">
          <p>{formattedDate}</p>
        </div>
      </div>
      <div className="m-5 p-5 border border-gray-300 rounded-lg shadow-md flex justify-between items-center">
        <h1>Mark Attendance</h1>
        <Button variant="destructive">Mark Attendance</Button>
      </div>
      <div className="flex justify-between items-center gap-5 m-5 h-fit rounded-lg">
        <div>
          <Card>
            <CardContent>
              <AttendanceChart present={stats?.presentDays || 0} total={stats?.totalDays || 1} />
            </CardContent>
          </Card>
        </div>

        <AttendanceCalendar presentDates={presentDates} />

        <div>
          <LeaveCard
            className="h-full w-full bg-amber-50"
            totalLeaves={24}
            usedLeaves={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard