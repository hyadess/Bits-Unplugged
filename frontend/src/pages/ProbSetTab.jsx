import React from "react";

const ProbSetTab = (props) => {
  // const tabs = ["Canvas", "Solution", "Test"];

  return (
    <div className="fixed flex mx-auto justify-between mb-5 w-[20vw] px-8 left-0 top-1/2 transform -translate-y-1/2">
      <div className="p-0 flex flex-col justify-between gap-5 w-full">
        {props.tabs.map((tab, index) => (
          <div
            className={`cursor-pointer flex-grow px-5 py-2 text-center font-bold text-2xl transition-colors duration-500  ${
              tab === props.activeTab
                ? "border-r-4 bu-text-title bg-slate-200"
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
