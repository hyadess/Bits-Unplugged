import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import { setLoading } from "../../App";
export default function SubmissionCard({
  submissionId,
  idx,
  problem_name,
  verdict,
  path,
}) {
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();
  return (
    <div class="items-center w-full">
      <div
        class={
          "border rounded-lg shadow-lg bg-gray-700 bu-card-primary flex flex-row p-4 items-center"
        }
      >
        <h5 class="text-2xl text-center font-bold tracking-tight bu-text-primary w-10%">
          {idx}
        </h5>
        <h5
          class="text-2xl md:text-3xl pl-5 font-bold tracking-tight bu-text-title w-75% cursor-pointer"
          // onClick={() => {
          //   setLoading(true);
          //   navigate(path);
          // }}
        >
          {problem_name}_{submissionId}
        </h5>
        <h1
          class="text-xl md:text-xl pl-5 font-bold tracking-tight bu-text-title w-75% cursor-pointer"
          //   onClick={() => {
          //     setLoading(true);
          //     navigate(path);
          //   }}
        >
          {verdict}
        </h1>
      </div>
    </div>
  );
}
