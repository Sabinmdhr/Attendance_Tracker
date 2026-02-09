import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import LeaveRequestForm from '@/components/users/LeaveRequestForm'
import LeaveTable from '@/components/leave/LeaveTable';
import api from '@/lib/api';
const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [show, setShow] = useState(false);

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

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

        <LeaveRequestForm  show={show} setShow={setShow} />
      </div>
      <div>
        <LeaveTable leaves={leaves}/>
      </div>
    </div>
  );
}

export default Leaves