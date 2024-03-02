import React from "react";

const ContestTab = (props) => {
  const tabs = ["Details", "Leaderboard", "My Submissions", "Editorial"];

  return (
    <div className="flex flex-col h-full mx-auto items-center">
      <div className="p-0 flex-grow">
        {tabs.map((tab, index) => (
          <div
            className={`cursor-pointer flex-grow px-5 py-2 text-center font-bold text-2xl ${
              tab === props.activeTab
                ? "border-l-4 bu-text-title"
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
