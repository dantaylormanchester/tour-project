import React from 'react';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <header className="header" role="banner">
      <div className="header__burger">
        <button
          type="button"
          className="header__menu-btn"
          aria-label="Open menu"
        >
          <svg
            className="header__menu-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M5 7H19M5 12H19M5 17H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="header__logo" aria-label="Manchester City FC logo">
        <img
          src={logo}
          alt="Manchester City FC"
          className="header__logo-svg"
          width={44}
          height={44}
          loading="eager"
        />
      </div>

      <div className="header__actions">
        <button
          type="button"
          className="header__profile"
          aria-label="Profile"
        >
          <svg
            className="header__avatar-icon"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden
          >
            <circle cx="16" cy="16" r="15" className="header__avatar-bg" />
            <circle cx="16" cy="13" r="5" className="header__avatar-head" />
            <path
              d="M6 28C6 23 10 20 16 20C22 20 26 23 26 28"
              className="header__avatar-body"
            />
          </svg>
        </button>

        <button
          type="button"
          className="header__basket"
          aria-label="Shopping basket"
        >
          <svg
            className="header__basket-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            {/* Shopping bag: two curved handles, rectangular body (Figma spec) */}
            <path
              d="M9 10V8a1.5 1.5 0 0 1 3 0v2M15 10V8a1.5 1.5 0 0 1 3 0v2M9 10h6l1.5 11h-9L9 10z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="header__basket-count" aria-hidden>0</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
