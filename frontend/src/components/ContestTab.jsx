import React from "react";

const ContestTab = (props) => {
  const tabs = ["Details", "Leaderboard", "Submissions", "Editorial"];

  return (
    <div className="flex flex-col w-full items-center my-auto">
      <div className="p-0 flex-grow w-full">
        {props.tabs.map((tab, index) => (
          <div
            className={`cursor-pointer flex-grow px-5 py-3 text-center font-bold text-2xl  ${
              tab === props.activeTab
                ? "border-r-4 bu-text-title bg-white"
                : "bu-text-disable hover:bg-gray-200"
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

export default ContestTab;
