import { useState, useEffect } from "react";
import api from "@/lib/api"; // adjust path to your axios/api instance

export default function useAttendanceStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

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
  }, []);

  return { stats, loading, error };
}
