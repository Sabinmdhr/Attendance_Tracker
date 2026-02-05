import React from "react";
import { Calendar } from "@/components/ui/calendar";

export default function AttendanceCalendar({ presentDates = [] }) {
  const [selectedDate, setSelectedDate] = React.useState(null);

  // normalize present dates to remove time
  const normalizedDates = presentDates.map(
    (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()),
  );

  return (
    <div className="h-full  rounded-lg border border-gray-300 shadow-md p-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        modifiers={{
          present: normalizedDates,
        }}
        modifiersClassNames={{
          present: "bg-green-600 text-white rounded-full",
        }}
      />
    </div>
  );
}
