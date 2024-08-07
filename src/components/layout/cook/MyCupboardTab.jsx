import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const MyCupboardTab = ({ closePopup , setShowPopup}) => {
  const [cupboard, setCupboard] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const dispatch = useDispatch();

  

  const addIngredient = () => {
    if (newIngredient && !cupboard.includes(newIngredient)) {
      setCupboard([...cupboard, newIngredient]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (ingredient) => {
    setCupboard(cupboard.filter(item => item !== ingredient));
  };

  const generateRecipes = () => {
    // dispatch(generateRecipes(cupboard));
    setShowPopup(true);
    console.log('Generating recipes with ingredients:', cupboard);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-frWhite">My Cupboard</h2>
      <ul className="list-disc ml-6 mb-4">
        {cupboard.map((ingredient, index) => (
          <li key={index} className="flex justify-between items-center text-frWhite">
            {ingredient}
            <button
              className="text-frRed"
              onClick={() => removeIngredient(ingredient)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="flex mb-4">
        <input
          type="text"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          className="border rounded p-2 mr-2 text-frBlack"
        />
        <button
          onClick={addIngredient}
          className="bg-frGreen text-frWhite px-4 py-2 rounded"
        >
          Add Ingredient
        </button>
      </div>
      <button
        onClick={generateRecipes}
        className="bg-frBlue text-frWhite px-4 py-2 rounded"
      >
        Generate Recipes
      </button>
    </div>
  );
};

export default MyCupboardTab;
