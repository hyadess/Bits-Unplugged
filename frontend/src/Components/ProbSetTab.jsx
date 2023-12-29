
import React from "react";

const ProbSetTab = (props) => {
  const tabs = ["statement", "canvas", "solution"];

  return (
    <div className="flex w-full mx-auto justify-between">
      <div className="p-0 flex flex-grow justify-between w-full">
        {tabs.map((tab) => (
          <div
            className={`cursor-pointer flex-grow px-5 py-2 text-center  font-bold text-2xl  ${
              tab === props.activeTab
                ? "border-b-4 bu-text-title"
                : "bu-text-disable"
            }`}
            onClick={() => props.click(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProbSetTab;
