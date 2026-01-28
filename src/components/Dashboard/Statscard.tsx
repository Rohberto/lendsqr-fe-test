import React from 'react';


interface StatsCardProps {
  icon: string;
  title: string;
  value: string;
  color: 'pink' | 'purple' | 'orange' | 'red';
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, color }) => {
  return (
    <div className="stats-card">
      <div className={`stats-card-icon ${color}`}>
         <img className="stat-icon" src={icon} alt="" aria-hidden="true" />
      </div>
      <div className="stats-card-content">
        <p className="stats-card-title">{title}</p>
        <h3 className="stats-card-value">{value}</h3>
      </div>
    </div>
  );
};

export default StatsCard;