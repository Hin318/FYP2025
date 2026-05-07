
import React from 'react';

const StatsDisplay = ({ stats }) => {
  
  const statConfig = [
   
  ];

  return (
    <div className="stats-hud">
      {statConfig.map((item) => {
        
        const currentValue = stats[item.key] || 0;
        const percentage = Math.min(100, Math.max(0, (currentValue / item.max) * 100));

        return (
          <div key={item.key} className="stat-item">
            <span className="stat-icon">{item.icon}</span>
            <div className="stat-bar-container">
              <div 
                className="stat-bar-fill" 
                style={{ 
                    width: `${percentage}%`,
                    backgroundColor: item.color
                }}
              ></div>
            </div>
            <span className="stat-value">{currentValue}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StatsDisplay;