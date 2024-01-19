import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import { setLoading } from "../../App";
import { problemApi } from "../../api";
export default function ProblemCard({
  id,
  idx,
  name,
  path,
  deleteAction,
  isLive,
}) {
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();
  const publishProblem = async () => {
    await problemApi.publishProblem(id);
  };
  const unpublishProblem = async () => {
    await problemApi.unpublishProblem(id);
  };
  return (
    <div className="items-center w-full">
      <div
        className={
          "border rounded-lg shadow-lg bg-gray-700 bu-card-primary flex flex-row p-4 items-center"
        }
      >
        <h5 className="text-2xl text-center font-bold tracking-tight bu-text-primary w-10%">
          {idx}
        </h5>
        <h5
          className="text-2xl md:text-3xl pl-5 font-bold tracking-tight bu-text-title w-75% cursor-pointer"
          onClick={() => {
            setLoading(true);
            navigate(path);
          }}
        >
          {name}
        </h5>
      </div>
    </div>
  );
}
