import React from "react";

import { Calendar } from "@/components/ui/calendar";
const AttendanceCalendar = () => {
const [date, setDate] = React.useState(new Date());
const presentDates=[]
  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="h-full w-full rounded-lg border border-gray-300 shadow-md p-4"
        modifiers={{
          present: presentDates, // Dates when student is present
        }}
        modifiersClassNames={{
          present: "bg-green-500 text-white rounded-full",
        }}
      />
    </div>
  );
};

export default AttendanceCalendar;
