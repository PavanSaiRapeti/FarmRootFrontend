import React, { useState, useEffect } from 'react';
import plus from '../components/assests/png/Plus.png';

import MainScreen from './layout/cook/MainScreen';
import Popup from './layout/cook/PopUp';
import { fetchRecipes } from '../store/actions/reciepesActions/actions';
import { useDispatch, useSelector } from 'react-redux';
import RecipeList from './layout/cook/RecipeList';
import { openRecipePopup } from '../store/actions/common/actions';

const RecipeGenerator = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cupboardIngredients, setCupboardIngredients] = useState([]);
  const recipes = useSelector(state => state.reciepes.recipes);
  const [popupContent, setPopupContent] = useState(false);
  
  const isRecipePopupOpen = useSelector(state => state.common.isOpen);
  const [showPopup, setShowPopup] = useState(false);
  const [showCupboardPopup, setShowCupboardPopup] = useState(false);
  const [rotate, setRotate] = useState(0);
  const dispatch = useDispatch();

  const onGenerate = (isTrue=false) => {
    if(!isTrue){
      dispatch(fetchRecipes(selectedIngredients));
    }else{
      setShowCupboardPopup(false);
      dispatch(fetchRecipes(cupboardIngredients));
      setShowPopup(true);
    }
  };


  const handleClosePopup = () => {
    setShowPopup(false);
    if (isRecipePopupOpen) {
      dispatch(openRecipePopup(null, false));
    }
  };

  const addIngredientToCupboard = (ingredient) => {
    setCupboardIngredients([...cupboardIngredients, ingredient]);
  };

  const removeIngredientFromCupboard = (ingredient) => {
    setCupboardIngredients(cupboardIngredients.filter(item => item !== ingredient));
  };
  const handleCupboardPopup = () => {
    setShowCupboardPopup(!showCupboardPopup);
  };

  const handleCloseCupboardPopup = () => {
    setShowCupboardPopup(false);
  };

  return (
    <div className="min-h-screen bg-frWhite flex">
      <button onClick={handleCupboardPopup} className="bg-frBlack text-white p-2 rounded-lg">My Cupboard</button>
      <div className="w-full p-4">
        <div className="mb-6">
        <div className="bg-frDarkGray flex justify-center items-center">
          <div className="bg-frLighterGray rounded-lg p-8 w-3/4 max-w-full relative font-bold">
            <h2 className="text-2xl font-bold mb-4 text-frGreen">Welcome to Recipe Generator!</h2>
            <p className="mb-4 text-frGreen">Here you can add ingredients to your cupboard and generate recipes based on those ingredients.</p>
            <p className="mb-4 text-frGreen">To get started, simply type an ingredient into the input box on the left and press Enter. Your ingredient will be added to the cupboard list. You can add as many ingredients as you like.</p>
            <p className="mb-4 text-frGreen">Once you have added your ingredients, click the "Generate" button to see recipes that you can make with the ingredients you have selected.</p>
          </div>
        </div>
          <div className="bg-frLighterGray p-6 rounded-lg shadow-md col-span-2">
            <MainScreen
              setSelectedIngredients={setSelectedIngredients}
              selectedIngredients={selectedIngredients}
              recipes={recipes}
              setPopupContent={setPopupContent}
              onGenerate={onGenerate}
              setShowPopup={setShowPopup}
            />
          </div>
        </div>
       
      </div>

      {popupContent && (
        <Popup content={popupContent} setPopupContent={setPopupContent} setShowPopup={setShowPopup} />
      )}
      {showPopup && (
        <div className="fixed inset-0 bg-frGray bg-opacity-50 flex justify-center items-center">
          <div className="bg-frWhite rounded-lg p-8 w-3/4 max-w-full relative">
            <div className="mt-4">
              <RecipeList recipes={recipes} handleClosePopup={handleClosePopup} showPopup={showPopup} />
            </div>
           
          </div>
        </div>
      )}
      {showCupboardPopup && (
        <div className="fixed inset-0 bg-frGreen bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 sm:w-3/4 max-w-full relative shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-frGreen">My Cupboard</h3>
            <p className="mb-6 text-frGreen">Add ingredients to your cupboard and generate recipes based on those ingredients.</p>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Add an ingredient"
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-frGreen"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    addIngredientToCupboard(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <ul className="list-disc pl-5 space-y-2">
                {cupboardIngredients.map((ingredient, index) => (
                  <li key={index} className="text-frGreen flex justify-between items-center">
                    {ingredient}
                    <button onClick={() => removeIngredientFromCupboard(ingredient)} className="text-red-500 hover:text-red-700">Remove</button>
                  </li>
                ))}
              </ul>
              <button onClick={()=>onGenerate(true)} className="bg-frBlack text-white p-3 rounded-lg mt-4 hover:bg-frDarkGray">Generate</button>
            </div>
            <button onClick={handleCupboardPopup} className="absolute top-2 right-2 text-red-500 hover:text-red-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;