
import React from 'react';
import './ProbSetTab.scss';

function ProbSetTab(props) {
  const tabs = [
    'statement',
    'canvas',
    'solution',
    
  ];

  return (
    <div className="tabs-container">
      <ul className="tabs-list">
        {tabs.map((tab) => (
          <li
            className={`tab-item ${tab === props.activeTab ? 'active' : ''}`}
            onClick={() =>props.click(tab) }
          >
            {tab}
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default ProbSetTab;
