import React from 'react';

const RecipeCard = ({ title, image, description }) => {
  return (
    <div className="bg-frGray rounded p-4">
      {image && <img src={image} alt={title} className="w-full h-32 object-cover mb-4" />}
      <h2 className="text-frBlack font-semibold">{title}</h2>
      <p className="text-frBlack">{description}</p>
      <button className="mt-2 bg-frGreen text-frWhite px-4 py-2 rounded">
        Add to Favorites
      </button>
    </div>
  );
};

export default RecipeCard;
