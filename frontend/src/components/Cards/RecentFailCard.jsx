import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import { setLoading } from "../../App";
import { getTimeStamp } from "services/dateUtil";
export default function RecentFailCard({
  idx,
  id,
  name,
  path,
  action,
  attempts,
  difficulty,
  duration,
  last_tried,
}) {
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();

  return (
    <div className="w-full h-full" key={id}>
      <div
        className={
          "border rounded-lg shadow-md bg-gray-700 bu-card-primary flex flex-col p-5 h-full"
        }
      >
        {/* <h5 className="text-2xl text-center font-bold tracking-tight bu-text-primary w-10%">
          {idx}
        </h5> */}

        <div className="flex flex-row cursor-pointer">
          <h5
            className="text-xl md:text-2xl tracking-tight bu-text-primary w-[30%] cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full"
            onClick={() => {
              setLoading(true);
              navigate(path);
            }}
          >
            {name}
          </h5>
          <h3 className="text-red-500 w-[15%] font-bold">{duration}s</h3>
          <h3 className="text-red-500 w-[10%] font-bold">{attempts}</h3>

          <h3
            className={`text-center w-[15%] text-lg ${
              difficulty > 1400 && difficulty < 2000
                ? "text-[#FF981E] font-medium"
                : difficulty < 1400
                  ? "text-green-500 font-sm"
                  : "text-red-500 font-extrabold"
            }`}
          >
            {difficulty}
          </h3>
          <div className="text-center w-[30%] text-xl bu-text-primary">
            {getTimeStamp(last_tried)}
          </div>
        </div>
      </div>
    </div>
  );
}
