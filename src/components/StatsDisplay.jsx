// src/components/StatsDisplay.jsx
import React from 'react';

const StatsDisplay = ({ stats }) => {
  // 定義每個數值的設定 (圖示、名稱、顏色、最大值)
  const statConfig = [
   
  ];

  return (
    <div className="stats-hud">
      {statConfig.map((item) => {
        // 計算百分比用來畫進度條 (避免超過 100%)
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