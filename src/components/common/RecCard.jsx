import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import { openRecipePopup } from '../../store/actions/common/actions';
import { useDispatch } from 'react-redux';

export const RecCard = ({ recipe }) => {
  const dispatch = useDispatch();

  const togglePopup = () => {
    dispatch(openRecipePopup(recipe,true));
  };



  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="px-4 py-2 sm:px-6 sm:py-4">
        <div className="font-bold text-lg sm:text-xl mb-1 sm:mb-2">{recipe.name || recipe.title}</div>
        <p className="text-gray-700 text-sm sm:text-base">
          Prep Time: {recipe.prepTime} | Cook Time: {recipe.cookTime} | Servings: {recipe.servings}
        </p>
      </div>
      <div className="px-4 pt-2 pb-1 sm:px-6 sm:pt-4 sm:pb-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded w-full sm:w-auto"
          onClick={togglePopup}
        >
          View Recipe
        </button>
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2"
          onClick={()=> alert('added to favourite')}
        >
          Add to Favourite
        </button>
      </div>

    </div>
  );
};