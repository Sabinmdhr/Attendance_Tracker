import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import UserForm from "@/components/users/UserForm";
import UserTable from "@/components/users/UserTable";
import axios from "axios";
import SearchUser from "@/components/users/SearchUser";
import WelcomeBar from "@/components/common/WelcomeBar";

import TablePagination from "@/components/TablePagination.jsx";
import { usePagination } from "@/hooks/usePagination";
import { Spinner } from "@/components/ui/spinner";
import { AdminAppContext } from "@/context/AdminAppContext";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const debouncedSearch = useDebounce(searchVal);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [users, setUsers] = useState([]);
  // const [searchVal, setSearchVal] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const debouncedSearch = useDebounce(searchVal);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const {
  //     users,
  //   setUsers,
  //   searchVal,
  //   setSearchVal,
  //   currentPage,
  //   setCurrentPage,
  //   rowsPerPage,
  //   setRowsPerPage,
  //   debouncedSearch,
  //   error,
  //   loading,
  //   setLoading,
  //   setError} = useContext(AdminAppContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/api/users");
      // Sort by newest first
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setUsers(sorted);
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
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

  const handleUserUpdated = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
    );
  };

  const handleUserCreated = (newUser) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
    setCurrentPage(1);
  };

  return (
    <div>
      <WelcomeBar />

      <div className="mx-18 mt-12">
        <div className="flex gap-4.5 justify-between items-center m-5">
          <UserForm onUserCreated={handleUserCreated} />
          <SearchUser
            searchVal={searchVal}
            setSearchVal={setSearchVal}
          />

          <Link to="/leaveManagement">
            <Button>View Leave Requests</Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : (
          <UserTable
            users={paginatedUsers}
            onUserUpdated={handleUserUpdated}
          />
        )}

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
