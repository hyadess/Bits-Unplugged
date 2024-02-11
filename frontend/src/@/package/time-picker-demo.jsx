"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "../components/ui/time-picker-input";

export function TimePickerDemo({ date, setDate }) {
  const minuteRef = useRef(null);
  const hourRef = useRef(null);
  const [period, setPeriod] = useState(date.getHours() >= 12 ? "PM" : "AM");

  // const secondRef = useRef(null);
  const togglePeriod = () => {
    const newDate = new Date(date);
    newDate.setHours((newDate.getHours() + 12) % 24);
    setDate(newDate);
    setPeriod((prev) => (prev === "AM" ? "PM" : "AM"));
    // periodRef.current?.focus();
  };
  // useEffect(() => {
  //   // setPeriod(date.getHours() >= 12 ? "PM" : "AM");
  //   console.log("Hours: ", date.getHours());
  //   if (
  //     period === "PM" &&
  //     (date.getHours() < 12 ||
  //       (date.getHours() === 24 && date.getMinutes() > 0))
  //   ) {
  //     // date.setHours(date.getHours() + 12);
  //     const newDate = new Date(date);
  //     newDate.setHours((newDate.getHours() + 12) % 24);
  //     setDate(newDate);
  //   } else if (period === "AM" && date.getHours() >= 12) {
  //     // date.setHours(date.getHours() - 12);
  //     const newDate = new Date(date);
  //     newDate.setHours((newDate.getHours() - 12) % 24);
  //     setDate(newDate);
  //   }
  // }, [date]);

  return (
    <div className="flex items-end justify-center gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => hourRef.current?.focus()}
        />
      </div>
      {/* <div className="grid gap-1 text-center">
        <Label htmlFor="period" className="text-xs">
          Period
        </Label>
        <button
          // ref={periodRef}
          onClick={togglePeriod}
          className="bg-white rounded-md hover:bg-gray-200 px-[1rem] py-[0.37rem] focus:outline-none w-[3.5rem]"
          // style={{ width: "2rem" }} // Add this line
        >
          {period}
        </button>
      </div> */}
      {/* <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div> */}

      {/* <div className="grid gap-1 text-center">
        <Label htmlFor="seconds" className="text-xs">
          Seconds
        </Label>
        <TimePickerInput
          picker="seconds"
          date={date}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div> */}
      {/* <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div> */}
    </div>
  );
}
