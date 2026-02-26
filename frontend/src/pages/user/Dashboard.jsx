import React, { useEffect, useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AttendanceChart from "@/components/AttendanceChart";
import AttendanceCalendar from "@/components/attendance/AttendanceCalendar";
import LeaveCard from "@/components/users/LeaveCard";
import api from "@/lib/api";
import WelcomeBar from "@/components/common/WelcomeBar";
import { UserAppContext } from "@/context/UserAppContext";
const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const getFormattedToday = () => new Date().toISOString().split("T")[0];
  const today = getFormattedToday();
  const storageKey = `markAttendance_${user.username}`; // per user key
  const [markAttendance, setMarkAttendance] = useState(() => {
    // Lazy init: load from localStorage immediately
    const stored = localStorage.getItem(storageKey);
    if (!stored) return false;
    try {
      const parsed = JSON.parse(stored);
      return parsed.date === today && parsed.value === true;
    } catch {
      return false;
    }
  });

  const {
    stats,
    setStats,
    loading,
    setLoading,
    dates,
    setDates,
    leaves,
    setLeaves,
  } = useContext(UserAppContext);
  
  // Save attendance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "storageKey",
      JSON.stringify({ date: today, value: markAttendance }),
    );
  }, [markAttendance, storageKey, today]);

  // Fetch stats and attendance from backend
  useEffect(() => {
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

    const fetchAttendance = async () => {
      try {
        const res = await api.get("/attendance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const attendanceData = res.data || [];
        const userDates = attendanceData
          .filter((a) => a.userId === user.username)
          .map((a) => new Date(a.date));
        setDates(userDates);

        // Check if attendance is already marked today in backend
        const todayMarked = attendanceData.some(
          (a) => a.userId === user.username && a.date === today,
        );
        if (todayMarked) setMarkAttendance(true); // ensures sync with backend
      } catch (err) {
        console.error("Error fetching attendance data:", err);
      }
    };

    fetchStats();
    fetchAttendance();
  }, [token, user.username, today]);

  // Mark attendance as Present
  const handleMarkAttendance = async () => {
    try {
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

      alert("Attendance marked successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to mark attendance");
    }
  };

  if (loading) return <p>Loading attendance stats...</p>;

  return (
    <div className="">
      <WelcomeBar />

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

      <div className="m-5 flex justify-between mt-8">
        <Card>
          <CardContent>
            <AttendanceChart
              present={stats?.presentDays || 0}
              total={stats?.totalDays || 1}
            />
          </CardContent>
        </Card>
        <AttendanceCalendar presentDates={dates} />
        <LeaveCard totalLeaves={5} usedLeaves={leaves.length} />
      </div>
    </div>
  );
};

export default Dashboard;
