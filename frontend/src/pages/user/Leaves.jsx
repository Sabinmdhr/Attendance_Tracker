import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import LeaveRequestForm from '@/components/users/LeaveRequestForm'
import LeaveTable from '@/components/leave/LeaveTable';
import api from '@/lib/api';

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [userRole , setUserRole] = useState("");
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const [refresh, setRefresh] = useState(false);

  useEffect(() => {

    const fetchLeaves = async () => {
      const res = await api.get("/leaves");
      const filteredLeaves = res.data.filter(
        (item) => item.userId === user.username,
      );
      setLeaves(filteredLeaves)
    };
    fetchLeaves();

  }, []);


// setLeaves(filteredLeaves)



  return (
    <div>
      <div className="p-5">

        <LeaveRequestForm  setLeaves={setLeaves} totalLeaves = {leaves.length} />
      </div>
      <div>
        <LeaveTable leaves={leaves} userRole={user.role}/>
      </div>
    </div>
  );
}

export default Leaves