import React from "react";
import { Button } from "../ui/button";

const UserFilter = () => {
  const filter = ["All", "Pending", "Approved", "Rejected"];

  //   let currentFilter = all;

  
  return (
    <div className="flex gap-3 items-center mr-[38%]">
      <Button>All</Button>
      <Button>Pending</Button>
      <Button>Approved</Button>
      <Button>Rejected</Button>
    </div>
  );
};

export default UserFilter;
