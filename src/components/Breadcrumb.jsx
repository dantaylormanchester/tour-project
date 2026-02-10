import React from 'react';
import './Breadcrumb.css';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <button
            type="button"
            className={`breadcrumb__link ${item.active ? 'breadcrumb__link--active' : ''}`}
            onClick={item.onClick}
          >
            {item.label}
          </button>
          {index < items.length - 1 && (
            <div className="breadcrumb__separator">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
