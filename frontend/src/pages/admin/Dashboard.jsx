import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useMemo, useState } from "react";
import UserForm from "@/components/users/UserForm";
import UserTable from "@/components/users/UserTable";
import axios from "axios";
import SearchUser from "@/components/users/SearchUser";
import WelcomeBar from "@/components/common/WelcomeBar";

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
const Dashboard = () => {
  // const [users, setUsers] = useState([]);
  // const [searchVal, setSearchVal] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const debouncedSearch = useDebounce(searchVal);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [users, setUsers] = useState([]);
  // const [searchVal, setSearchVal] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const debouncedSearch = useDebounce(searchVal);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const {
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
    loading,
    setLoading,
    setError,
    sortBy,
    setSortBy,
  } = useContext(AdminAppContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/api/users");

      // Assign a "fake" createdAt using current timestamp or id order
      const usersWithDate = res.data.map((user, index, arr) => ({
        ...user,
        createdAt: user.createdAt || Date.now() - (arr.length - index), // first user gets smallest timestamp
      }));
      setUsers(usersWithDate);
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

  const filteredUsers = useMemo(() => {
    let result = users.filter((user) =>
      searchWords.every((word) => user.username.toLowerCase().includes(word)),
    );

    // Optional: push blocked users to bottom
    result.sort((a, b) => {
      // Push blocked users last
      if (a.role === "blocked" && b.role !== "blocked") return 1;
      if (a.role !== "blocked" && b.role === "blocked") return -1;

      // Sort by createdAt
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);

      if (sortBy === "username") return a.username.localeCompare(b.username);
      return 0;
    });

    return result;
  }, [users, searchWords, sortBy]);

  const paginatedUsers = usePagination(filteredUsers, currentPage, rowsPerPage);

  const handleUserUpdated = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === updatedUser.id
          ? { ...updatedUser, createdAt: u.createdAt }
          : u,
      ),
    );
  };

  // const handleUserCreated = (newUser) => {
  //   setUsers((prevUsers) => [newUser, ...prevUsers]);
  //   setCurrentPage(1);
  // };
  const handleUserCreated = (newUser) => {
    setUsers((prevUsers) => [
      { ...newUser, createdAt: Date.now() },
      ...prevUsers,
    ]);
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
        <div className="ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort: {sortBy}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Sort Users By</DropdownMenuLabel>
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
                  <DropdownMenuRadioItem value="username">
                    Username
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
