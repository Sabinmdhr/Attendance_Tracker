import api from "@/lib/api";
import react, { useState, useEffect, useContext, createContext } from "react";

import { useDebounce } from "@/hooks/useDebounce";

export const AdminAppContext = createContext();

export default function AdminAppProvider({ children }) {
  // Admin dashboard states
  const [users, setUsers] = useState([]);
  const [adminLeaves, setAdminLeaves] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const debouncedSearch = useDebounce(searchVal);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  return (
    <AdminAppContext.Provider
      value={{
        loading,
        setLoading,
        users,
        setUsers,
        searchVal,
        setSearchVal,
        currentPage,
        setCurrentPage,
        rowsPerPage,
        setRowsPerPage,
        debouncedSearch,
        error,
        setError,
        currentFilter,
        setCurrentFilter,
        adminLeaves,
        setAdminLeaves,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </AdminAppContext.Provider>
  );
}
