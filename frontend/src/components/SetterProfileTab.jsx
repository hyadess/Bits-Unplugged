
import React from "react";

const SetterProfileTab = (props) => {
  const tabs = ["Details", "Designed Problems", "Designed Contests","collaborations"];

  return (
    <div className="flex flex-col pt-20 w-full mx-auto justify-between">
      <div className="p-0 flex flex-col justify-between w-full">
        {tabs.map((tab, index) => (
          <div
            className={`cursor-pointer flex-grow px-5 py-5 text-center  font-bold text-2xl hover:bg-gray-200 ${
              tab === props.activeTab
                ? "border-r-4 bu-text-title"
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

export default SetterProfileTab;
