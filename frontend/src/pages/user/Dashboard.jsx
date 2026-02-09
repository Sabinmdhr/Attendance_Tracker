import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AttendanceChart from "@/components/AttendanceChart";
import AttendanceCalendar from "@/components/attendance/AttendanceCalendar";
import LeaveCard from "@/components/users/LeaveCard";
import api from "@/lib/api";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user) {
    window.location.href = "/";
    return null;
  }

  // State
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState([]);
  const [markAttendance, setMarkAttendance] = useState(() => {
    // Initialize from localStorage
  });
  // Helpers
  const getFormattedToday = () => new Date().toISOString().split("T")[0];

  // Mark attendance as Present
  const handleMarkAttendance = async () => {
    try {
      const today = getFormattedToday();
      const newAttendance = {
        userId: user.username,
        date: today,
        status: "Present",
        timestamp: new Date().toISOString(),
      };

      await api.post("/attendance", newAttendance, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDates((prev) => [...prev, new Date(today)]);
      setMarkAttendance(true);
      localStorage.setItem(
        "markAttendance",
        JSON.stringify({ date: today, value: true }),
      );

      alert("Attendance marked successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to mark attendance");
    }
  };

  // Automatically mark Absent if not present by deadline
  // const handleAbsentAutomatically = async (userDates) => {
  //   if (!token || !user) return;

  //   try {
  //     const today = getFormattedToday();
  //     const newAttendance = {
  //       userId: user.username,
  //       date: today,
  //       status: "Absent",
  //       timestamp: new Date().toISOString(),
  //     };

  //     await api.post("/attendance", newAttendance, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     setMarkAttendance(true);

  //     console.log("User automatically marked absent");
  //   } catch (err) {
  //     console.error("Failed to mark absent:", err);
  //   }
  // };

  // Initial setup
  useEffect(() => {
    // Fetch attendance stats
    const fetchStats = async () => {
      try {
        const res = await api.get("/attendance/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error(
          "Error fetching stats:",
          err.response?.data || err.message,
        );
      } finally {
        setLoading(false);
      }
    };

    const init = async () => {
      // Fetch attendance data
      let userDates = [];
      try {
        const res = await api.get("/attendance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const attendanceData = res.data || [];

        userDates = attendanceData
          .filter((a) => a.userId === user.username)
          .map((a) => new Date(a.date));

        setDates(userDates);
      } catch (err) {
        console.error("Error fetching attendance data:", err);
      }

      // Set automatic absent deadline (12:15 PM)
      // const deadline = new Date();
      // deadline.setHours(12, 15, 0, 0);
      // const timeUntilDeadline = deadline - new Date();

      // if (timeUntilDeadline > 0) {
      //   const timer = setTimeout(() => {
      //     handleAbsentAutomatically(userDates);
      //   }, timeUntilDeadline);

      //   return () => clearTimeout(timer); // cleanup
      // } else {
      //   handleAbsentAutomatically(userDates);
      // }
    };

    init();
    fetchStats();
  }, []);

  if (loading) return <p>Loading attendance stats...</p>;

  return (
    <div>
      <div className="m-5 p-5 border border-gray-300 rounded-lg shadow-md flex justify-between items-center">
        <h1>Mark Attendance</h1>
        <Button
          onClick={handleMarkAttendance}
          variant="destructive"
          disabled={markAttendance}
        >
          {markAttendance ? "Attendance Completed" : "Mark Attendance"}
        </Button>
      </div>

      <div className="flex justify-between items-center gap-5 m-5 h-fit rounded-lg">
        <Card>
          <CardContent>
            <AttendanceChart
              present={stats?.presentDays || 0}
              total={stats?.totalDays || 1}
            />
          </CardContent>
        </Card>

        <AttendanceCalendar presentDates={dates} />

        <LeaveCard
          className="h-full w-full bg-amber-50"
          totalLeaves={24}
          usedLeaves={5}
        />
      </div>
    </div>
  );
};

export default Dashboard;
