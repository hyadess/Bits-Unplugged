
import React from "react";

const ContestSetTab = (props) => {
  const tabs = ["Details", "Problems"];

  return (
    <div className="flex w-full mx-auto justify-between">
      <div className="p-0 flex flex-grow justify-between w-full">
        {tabs.map((tab, index) => (
          <div
            className={`cursor-pointer flex-grow px-5 py-2 text-center  font-bold text-2xl  ${
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

export default ContestSetTab;
