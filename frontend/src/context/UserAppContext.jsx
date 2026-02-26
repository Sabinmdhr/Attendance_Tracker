import api from "@/lib/api";
import react, { useState, useEffect, useContext, createContext } from "react";

import { useDebounce } from "@/hooks/useDebounce";

export const UserAppContext = createContext();

export default function UserAppProvider({ children }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState([]);
  const [leaves, setLeaves] = useState([]);

  // Admin dashboard states
  // const [users, setUsers] = useState([]);
  // const [searchVal, setSearchVal] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const debouncedSearch = useDebounce(searchVal);
  // const [error, setError] = useState(null);
  // const [currentFilter, setCurrentFilter] = useState("all");

  // const token = localStorage.getItem("token");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchLeaves = async () => {
      const res = await api.get("/leaves");
      const filteredLeaves = res.data.filter(
        (item) => item.userId === user.username,
      );
      setLeaves(filteredLeaves);
    };
    fetchLeaves();
  }, []);

  return (
    <UserAppContext.Provider
      value={{
        stats,
        setStats,
        loading,
        setLoading,
        dates,
        setDates,
      
        leaves,
        setLeaves,
      }}
    >
      {children}
    </UserAppContext.Provider>
  );
}
