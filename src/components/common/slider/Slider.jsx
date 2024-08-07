import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider = ({ slideItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % slideItems.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex, slideItems]);

  return (
    <div className="slider-container">
      <div className="slider">
        {slideItems.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
          >
            <div className='w-full h-full' >
            <div className="absolute top-1/2 -translate-y-1/2  text-frGray">
              <h2 className="text-9xl font-bold">{slide.title}</h2>
              <p className='italic p-8'>{slide.description.map((line, lineIndex) => (
                <span key={lineIndex}>{line}<br /></span>
              ))}</p>
            </div>
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-15 rounded-xl" />
            </div>
              </div>
        ))}
        <div className="indicator">
        {slideItems.map((_, index) => (
          <span key={index} className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}></span>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Slider;