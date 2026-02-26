import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LeaveTable from "@/components/leave/LeaveTable";
import UserFilter from "@/components/users/UserFilter";
import { useDebounce } from "@/hooks/useDebounce";
import SearchUser from "@/components/users/SearchUser";
import TablePagination from "@/components/TablePagination.jsx";
import { usePagination } from "@/hooks/usePagination";

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchVal, setSearchVal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const debouncedSearch = useDebounce(searchVal);

  useEffect(() => {
    const fetchLeaves = async () => {
      const res = await axios.get("http://localhost:3001/api/leaves");
      // console.log(res.data);

      setLeaves(res.data);
    };
    fetchLeaves();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentFilter, debouncedSearch]);

  const filteredLeaves = leaves.filter((leave) => {
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
          <Button>Go Back</Button>
        </Link>
      </div>

      <div className="flex justify-evenly mt-4">
        <UserFilter
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
        <SearchUser
          searchVal={searchVal}
          setSearchVal={setSearchVal}
        />
      </div>

      <div className="mt-10">
        <LeaveTable leaves={paginatedLeaves} />{" "}
      </div>

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
