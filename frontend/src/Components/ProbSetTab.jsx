
import React from 'react';
import './ProbSetTab.scss';

const ProbSetTab = (props) => {
  const tabs = ["statement", "canvas", "solution"];

  return (
    <div className="tabs-container">
      <ul className="tabs-list">
        {tabs.map((tab) => (
          <li
            className={`cursor-pointer flex-grow px-5 py-2 text-center  font-bold text-2xl ${
              tab === props.activeTab
                ? "border-b-4 bu-text-title"
                : "bu-text-disable"
            }`}
            onClick={() => props.click(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProbSetTab;
