import React, { useState } from 'react';
import RecipeList from './RecipeList';
import { searchOptions } from '../../../constants/constant';
import MultiSelect from '../../common/MultiSelect';
import FrButton from '../../common/FrButton';
import { fetchRecipesSuccess } from '../../../store/actions/reciepesActions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { openRecipePopup } from '../../../store/actions/common/actions';

const MainScreen = ({ setSelectedIngredients, onGenerate, setShowPopup }) => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (newValues) => {
    setSelectedOptions(newValues);
    setSelectedIngredients(newValues);
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    const updatedOptions = selectedOptions.filter(option => option !== ingredientToRemove);
    setSelectedOptions(updatedOptions);
    setSelectedIngredients(updatedOptions);
    dispatch(fetchRecipesSuccess([]));
  };

  const handleGenerateClick = () => {
    dispatch(fetchRecipesSuccess([]));
    onGenerate();
    setShowPopup(true);
   
  };



  return (
    <div className="p-6">
      <div className="input mt-4 flex flex-wrap">
        {selectedOptions.map((ingredient, index) => (
          <label key={index} className="text-xs bg-gray-200 px-1 py-0.5 rounded-full mr-1 mb-1">
            {ingredient}
            <button
              className="text-red-500 hover:text-red-700 font-bold ml-1"
              onClick={() => handleRemoveIngredient(ingredient)}
            >
              &times;
            </button>
          </label>
        ))}
      </div>
      <MultiSelect
        options={searchOptions}
        onChange={handleSelectChange}
        value={selectedOptions}
        placeholder="Select some options"
      />

      <FrButton
        onClick={handleGenerateClick}
        text="Generate"
        width={8}
        textColor="frWhite"
        height="2"
        bgColor="frGreen"
      />
    </div>
  );
};

export default MainScreen;
