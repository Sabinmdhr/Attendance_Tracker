import React from "react";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

const SearchUser = ({ searchVal, setSearchVal }) => {
  return (
    <div className="w-[40%] ">
      <Field orientation="horizontal">
        <Input
          type="search"
          placeholder="Search..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <Button type="button">Search</Button>
      </Field>
    </div>
  );
};

export default SearchUser;
