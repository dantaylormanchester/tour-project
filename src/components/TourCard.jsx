import React from 'react';
import Badge from './Badge';
import './TourCard.css';

const TourCard = ({ 
  image, 
  title, 
  price, 
  description, 
  badges = [],
  onMoreInfo 
}) => {
  return (
    <div className="tour-card">
      <div className="tour-card__image">
        <img src={image} alt={title} />
      </div>
      
      <div className="tour-card__content">
        <div className="tour-card__header">
          {badges.length > 0 && (
            <div className="tour-card__badges">
              {badges.map((badge, index) => (
                <Badge key={index} text={badge} variant="small" size="small" />
              ))}
            </div>
          )}
          
          <h3 className="tour-card__title">{title}</h3>
          <p className="tour-card__price">{price}</p>
        </div>
        
        <p className="tour-card__description">{description}</p>
        
        <button className="tour-card__button" onClick={onMoreInfo}>
          More info
        </button>
      </div>
    </div>
  );
};

export default TourCard;
