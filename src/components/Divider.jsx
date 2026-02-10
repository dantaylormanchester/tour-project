import React from 'react';
import './Divider.css';

const Divider = ({ className = '', vertical = false }) => {
  return (
    <div className={`divider ${vertical ? 'divider--vertical' : ''} ${className}`}>
      <div className="divider__line"></div>
    </div>
  );
};

export default Divider;
