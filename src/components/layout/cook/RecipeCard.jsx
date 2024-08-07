import React from 'react';

const RecipeCard = ({ recipe, setPopupContent }) => {
  return (
    <div className="border rounded p-4 mb-4">
      <h3 className="text-lg font-semibold">{recipe.title}</h3>
      {recipe.image && <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover mb-2" />}
      <p>{recipe.description}</p>
      <button
        className="bg-frGreen text-frWhite px-2 py-1 mt-2 rounded"
        onClick={() => setPopupContent(recipe)}
      >
        View Details
      </button>
    </div>
  );
};

export default RecipeCard;
