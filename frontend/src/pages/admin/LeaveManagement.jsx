import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LeaveTable from "@/components/leave/LeaveTable";
import UserFilter from "@/components/users/UserFilter";
import { useDebounce } from "@/hooks/useDebounce";
import SearchUser from "@/components/users/SearchUser";
import TablePagination from "@/components/TablePagination.jsx";
import { usePagination } from "@/hooks/usePagination";
import { Spinner } from "@/components/ui/spinner";
import { AdminAppContext } from "@/context/AdminAppContext";

const LeaveManagement = () => {
  // const [leaves, setLeaves] = useState([]);
  // const [searchVal, setSearchVal] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const {
    adminLeaves,
    setAdminLeaves,
    loading,
    setLoading,
    error,
    setError,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    currentFilter,
    setCurrentFilter,
    debouncedSearch,
    searchVal,
    setSearchVal,
  } = useContext(AdminAppContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/api/leaves");
      // console.log(res.data);
      setAdminLeaves(res.data);
    } catch (error) {
      setError("Failed to fetch leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentFilter, debouncedSearch]);

  const filteredLeaves = adminLeaves.filter((leave) => {
    const matchesStatus =
      currentFilter === "all" || leave.status?.toLowerCase() === currentFilter;

    const matchesSearch =
      !debouncedSearch ||
      leave.userId?.toLowerCase().includes(debouncedSearch.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const paginatedLeaves = usePagination(
    filteredLeaves,
    currentPage,
    rowsPerPage,
  );

  return (
    <div>
      <div className="mt-6">
        <Link to="/admin-dashboard">
          <Button variant="default">← Back</Button>
        </Link>
      </div>

      <div className="flex justify-evenly mt-4">
        <UserFilter
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
        <SearchUser searchVal={searchVal} setSearchVal={setSearchVal} />
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : (
        <div className="mt-10">
          <LeaveTable
            leaves={paginatedLeaves}
            userRole={user.role}
            onLeaveUpdated={fetchLeaves}
          />
        </div>
      )}

      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalItems={filteredLeaves.length}
      />
    </div>
  );
};

export default LeaveManagement;
