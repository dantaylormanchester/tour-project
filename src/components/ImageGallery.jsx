import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images, mainVideo }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const showVideo = mainVideo && selectedIndex === 0;

  return (
    <div className="image-gallery">
      <div className="image-gallery__main">
        {showVideo ? (
          <video 
            className="image-gallery__video"
            autoPlay 
            loop 
            muted 
            playsInline
            poster={images[0]}
          >
            <source src={mainVideo} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={images[selectedIndex]} 
            alt="Stadium tour view" 
            className="image-gallery__image"
          />
        )}
      </div>
      
      <div className="image-gallery__thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            className={`image-gallery__thumbnail ${index === selectedIndex ? 'image-gallery__thumbnail--active' : ''}`}
            onClick={() => setSelectedIndex(index)}
            aria-label={`View image ${index + 1}`}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
