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
  const [dates, setDates]= useState([]);




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

const fetchAttendanceData = async () => {
  try {
    const res = await api.get("/attendance");
    const attendanceData = res.data || []; // make sure it's an array

    const user = JSON.parse(localStorage.getItem("user"));
console.log("API response:", res.data);
console.log("Attendance data:", attendanceData);
    const userDates = attendanceData
      .filter((a) => a.userId === user.username)
      .map((a) => {
        const [y, m, d] = a.date.split("-");
        return new Date(y, m - 1, d);
      });

    setDates(userDates);
    console.log(userDates);

  } catch (err) {
    console.log(err);
  }
};


 fetchStats();
fetchAttendanceData();

},[]);


  if (loading) return <p>Loading attendance stats...</p>;

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
     
      <div className="m-5 p-5 border border-gray-300 rounded-lg shadow-md flex justify-between items-center">
        <h1>Mark Attendance</h1>
        <Button variant="destructive">Mark Attendance</Button>
      </div>
      <div className="flex justify-between items-center gap-5 m-5 h-fit rounded-lg">
        <div className="">
          <Card>
              <CardContent>
                <AttendanceChart
                  present={stats?.presentDays || 0}
                  total={stats?.totalDays || 1}
                />
              </CardContent>

          </Card>
        </div>

        <AttendanceCalendar presentDates={dates} />

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