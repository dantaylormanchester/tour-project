import React from 'react';
import './Badge.css';

const Badge = ({ icon, text, variant = 'default', size = 'medium' }) => {
  return (
    <div className={`badge badge--${variant} badge--${size}`}>
      {icon && <div className="badge__icon">{icon}</div>}
      <span className="badge__text">{text}</span>
    </div>
  );
};

export default Badge;
