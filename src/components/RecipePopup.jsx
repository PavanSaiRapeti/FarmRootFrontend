import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import { openRecipePopup } from '../store/actions/common/actions';

const RecipePopup = ({ recipe }) => {
  if (!Array.isArray(recipe.ingredients)) {
    recipe.ingredients = [recipe.ingredients];
  }
  if (!Array.isArray(recipe.instructions)) {
    recipe.instructions = [recipe.instructions];
  }
  const dispatch = useDispatch();
  const isPopupOpen = useSelector(state => state.common.isOpen);
  const [timeLeft, setTimeLeft] = useState(0);

  const startTimer = (minutes) => {
    setTimeLeft(minutes * 60);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (isPopupOpen) {
      setTimeLeft(0); // Reset timer when popup opens
    }
  }, [isPopupOpen]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const nutritionData = {
    labels: ['Calories (kcal)', 'Protein (g)', 'Carbohydrates (g)', 'Fat (g)'],
    datasets: [
      {
        label: 'Nutrition',
        data: [
          recipe?.nutrition?.calories || 0,
          parseInt(recipe?.nutrition?.protein) || 0,
          parseInt(recipe?.nutrition?.carbohydrates) || 0,
          parseInt(recipe?.nutrition?.fat) || 0
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  };

  if (recipe) {
    return (
      <div className="bg-opacity-50 flex justify-center items-center w-full h-full fixed inset-0 bg-gray-800">
        <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 relative">
          <button
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 font-bold"
            onClick={() => dispatch(openRecipePopup(null, false))}
          >
            &larr; Back
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">{recipe.name}</h2>
              <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc list-inside mb-4">
                {recipe && recipe.ingredients && recipe.ingredients.length > 0 && recipe.ingredients.map((ingredient, index) => (
                  (ingredient.name || ingredient.amount) ? 
                  <li key={index}>{ingredient.name}: {ingredient.amount}</li> : <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h3 className="text-xl font-semibold mb-2">Cooking Timer</h3>
              <div className="flex items-center mb-4">
                <input
                  type="number"
                  className="border rounded py-2 px-3 mr-2"
                  placeholder="Minutes"
                  onChange={(e) => startTimer(e.target.value)}
                />
                <span className="text-lg font-bold">{formatTime(timeLeft)}</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Nutrition</h3>
              <div className="w-full h-64">
                <Bar data={nutritionData} />
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Instructions</h3>
          <ol className="list-decimal list-inside mb-4">
            {recipe && recipe.instructions && recipe.instructions.length > 0 && recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default RecipePopup;