import React from "react";

const ProbSetTab = (props) => {
  // const tabs = ["Canvas", "Solution", "Test"];

  return (
    <div className="flex w-full mx-auto justify-between mb-5 bu-card-primary rounded-full px-8">
      <div className="p-0 flex flex-grow justify-between w-full gap-5">
        {props.tabs.map((tab, index) => (
          <div
            className={`cursor-pointer flex-grow px-5 py-2 text-center  font-bold text-2xl transition-colors duration-500  ${
              tab === props.activeTab
                ? "border-b-4 bu-text-title"
                : "bu-text-disable"
            }`}
            onClick={() => props.click(tab)}
            key={index}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProbSetTab;
