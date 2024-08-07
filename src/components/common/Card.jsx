import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="w-full bg-frWhite rounded-3xl p-4 h-auto shadow-lg h-min">{children}</div>
  );
};

export default Card;