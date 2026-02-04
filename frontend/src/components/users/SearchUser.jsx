import React, { useEffect, useState } from "react";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

const SearchUser = ({ searchVal, setSearchVal }) => {
  return (
    <div className="flex w-full justify-center">
      <Field
        orientation="horizontal"
        className="w-[50%]"
      >
        <Input
          type="search"
          placeholder="Search..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <Button>Search</Button>
      </Field>
    </div>
  );
};

export default SearchUser;
