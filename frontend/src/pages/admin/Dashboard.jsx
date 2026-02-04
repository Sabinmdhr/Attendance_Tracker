import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import UserForm from "@/components/users/UserForm";
import UserTable from "@/components/users/UserTable";
import axios from "axios";
import SearchUser from "@/components/users/SearchUser";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:3001/api/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const searchWords = searchVal.toLowerCase().trim().split(/\s+/);

  const filteredUsers = users.filter((user) =>
    searchWords.every((word) => user.username.toLowerCase().includes(word)),
  );

  return (
    <div>
      <div className="mx-18 mt-12">
        <div className="flex gap-4.5 justify-between items-center m-5">
          <UserForm />

          <SearchUser
            searchVal={searchVal}
            setSearchVal={setSearchVal}
          />

          <Link to="/leaveManagement">
            <Button>View Leave Requests</Button>
          </Link>
        </div>

        <UserTable users={filteredUsers} />
      </div>
    </div>
  );
};

export default Dashboard;
