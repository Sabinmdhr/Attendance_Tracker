import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LeaveTable from "@/components/leave/LeaveTable";
import UserFilter from "@/components/users/UserFilter";
import SearchUser from "@/components/users/SearchUser";
import TablePagination from "@/components/TablePagination.jsx";
import { usePagination } from "@/hooks/usePagination";
import { Spinner } from "@/components/ui/spinner";
import { AdminAppContext } from "@/context/AdminAppContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LeaveManagement = () => {
  const [sortBy, setSortBy] = useState("newest");
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

  const filteredLeaves = useMemo(() => {
    let result = adminLeaves.filter((leave) => {
      const matchesStatus =
        currentFilter === "all" ||
        leave.status?.toLowerCase() === currentFilter;

      const matchesSearch =
        !debouncedSearch ||
        leave.userId?.toLowerCase().includes(debouncedSearch.toLowerCase());

      return matchesStatus && matchesSearch;
    });

    switch (sortBy) {
      case "newest":
        return result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

      case "oldest":
        return result.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );

      case "startDate":
        return result.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate),
        );

      case "status":
        const order = {
          pending: 0,
          approved: 1,
          rejected: 2,
        };

        return result.sort(
          (a, b) =>
            order[a.status.toLowerCase()] - order[b.status.toLowerCase()],
        );

      default:
        return result;
    }
  }, [adminLeaves, currentFilter, debouncedSearch, sortBy]);

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
        <SearchUser
          searchVal={searchVal}
          setSearchVal={setSearchVal}
        />
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Sort: {sortBy}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={setSortBy}
              >
                <DropdownMenuRadioItem value="newest">
                  Newest First
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem value="oldest">
                  Oldest First
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem value="status">
                  Status
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
