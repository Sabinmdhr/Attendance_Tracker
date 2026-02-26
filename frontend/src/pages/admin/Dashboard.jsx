import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import UserForm from "@/components/users/UserForm";
import UserTable from "@/components/users/UserTable";
import axios from "axios";
import SearchUser from "@/components/users/SearchUser";
import { useDebounce } from "@/hooks/useDebounce";
import WelcomeBar from "@/components/common/WelcomeBar";

import TablePagination from "@/components/TablePagination.jsx";
import { usePagination } from "@/hooks/usePagination";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const debouncedSearch = useDebounce(searchVal);

  // const token = localStorage.getItem("token");

  // If not user than redirect to login page
  if (!user || user.role !== "admin") {
    window.location.href = "/";
    return null;
  }

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3001/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const searchWords = debouncedSearch.toLowerCase().trim().split(/\s+/);

  const filteredUsers = users.filter((user) =>
    searchWords.every((word) => user.username.toLowerCase().includes(word)),
  );

  const paginatedUsers = usePagination(filteredUsers, currentPage, rowsPerPage);

  return (
    <div>
      <WelcomeBar />

      <div className="mx-18 mt-12">
        <div className="flex gap-4.5 justify-between items-center m-5">
          <UserForm onUserCreated={fetchUsers} />

          <SearchUser
            searchVal={searchVal}
            setSearchVal={setSearchVal}
          />

          <Link to="/leaveManagement">
            <Button>View Leave Requests</Button>
          </Link>
        </div>

        <UserTable
          users={paginatedUsers}
          onUserUpdated={fetchUsers}
        />

        <TablePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalItems={filteredUsers.length}
        />
      </div>
    </div>
  );
};

export default Dashboard;
