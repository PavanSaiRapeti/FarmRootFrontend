import React from 'react';

const RecipeDetailsPopup = ({ recipe, closePopup }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">{recipe?.title}</h2>
      {recipe?.image && <img src={recipe?.image} alt={recipe?.title} className="w-full h-60 object-cover mb-4" />}
      <p className="text-white">{recipe?.description}</p>
      <h3 className="text-xl font-semibold mt-4 text-white">Steps</h3>
      <ul className="list-disc ml-6">
        {recipe?.steps.map((step, index) => (
          <li key={index} className="text-white">{step}</li>
        ))}
      </ul>
      <button
        className="bg-frGreen text-white px-4 py-2 mt-4 rounded"
        onClick={() => alert('Saved to Favourites')}
      >
        Save to Favourites
      </button>
    </div>
  );
};

export default RecipeDetailsPopup;
