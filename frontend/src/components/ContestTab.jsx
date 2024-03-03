import React from "react";

const ContestTab = (props) => {
  const tabs = ["Details", "Leaderboard", "Submissions", "Editorial"];

  return (
    <div className="flex flex-col mx-auto items-center my-auto">
      <div className="p-0 flex-grow">
        {props.tabs.map((tab, index) => (
          <div
            className={`cursor-pointer flex-grow px-5 py-2 text-right font-bold text-2xl hover:bg-gray-200 ${
              tab === props.activeTab
                ? "border-r-4 bu-text-title bg-gray-200"
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

export default ContestTab;
