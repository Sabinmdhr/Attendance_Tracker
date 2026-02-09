import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DateRangePicker({date, setDate}) {


  return (
    <div className="grid gap-2">
      <Popover className="w-full" >
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-70 justify-start text-left font-normal",
              !date.from && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 " />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "d MMM")} - {format(date.to, "d MMM")}
                </>
              ) : (
                format(date.from, "d MMM")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0" align="start" side="right">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
