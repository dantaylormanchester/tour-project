import React, { useState } from 'react';
import Divider from './Divider';
import './BookingWidget.css';

const BookingWidget = ({ price = '£22', priceLabel = 'from' }) => {
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking:', { date, participants });
  };

  return (
    <div className="booking-widget">
      <div className="booking-widget__price">
        <p className="booking-widget__price-label">{priceLabel}</p>
        <p className="booking-widget__price-value">{price} per person</p>
      </div>
      
      <form className="booking-widget__form" onSubmit={handleSubmit}>
        <div className="booking-widget__inputs">
          <button type="button" className="booking-widget__input">
            <div className="booking-widget__input-content">
              <div className="booking-widget__input-icon">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <rect x="3" y="4" width="11" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M3 7H14M6 3V5M11 3V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="booking-widget__input-text">Select date</span>
            </div>
            <div className="booking-widget__input-chevron">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M5 7L8.5 10.5L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
          
          <button type="button" className="booking-widget__input">
            <div className="booking-widget__input-content">
              <div className="booking-widget__input-icon">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <circle cx="8.5" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M3 14C3 11.5 5.5 9.5 8.5 9.5C11.5 9.5 14 11.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="booking-widget__input-text">Select participants</span>
            </div>
            <div className="booking-widget__input-chevron">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M5 7L8.5 10.5L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
          
          <button type="submit" className="booking-widget__submit">
            Show available tours
          </button>
        </div>
        
        <Divider />
        
        <div className="booking-widget__cancellation">
          <div className="booking-widget__cancellation-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8.5" stroke="#0d775d" strokeWidth="1.5"/>
              <path d="M7 10L9 12L13 8" stroke="#0d775d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="booking-widget__cancellation-text">
            <p className="booking-widget__cancellation-title">Free cancellation</p>
            <p className="booking-widget__cancellation-desc">
              Cancel up to 24 hours in advance for a full refund
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingWidget;
