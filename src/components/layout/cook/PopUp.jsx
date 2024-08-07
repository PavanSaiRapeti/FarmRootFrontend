import React, { useState } from 'react';
import RecipeDetailsPopup from './RecipeDetailsPopup';
import MyCupboardTab from './MyCupboardTab';
import FavouriteRecipesTab from './FavouriteRecipesTab';

const Popup = ({ content, setPopupContent , setShowPopup}) => {
  const [activeTab, setActiveTab] = useState(content.type || 'recipe');
  const closePopup = () => setPopupContent(null);

  return (
    <div className="bg-frBlack p-6 rounded-lg shadow-xl w-full max-w-3xl fixed bottom-16 h-1/2">
      <div className="flex justify-center mb-4">
        <button className={`ml-4 px-4 py-2 ${activeTab === 'cupboard' ? 'bg-frGreen text-white' : 'bg-frLightGreen text-frGreen'} rounded hover:bg-frDarkGreen transition duration-300`} onClick={() => setActiveTab('cupboard')}>My Cupboard</button>
        <button className={`ml-4 px-4 py-2 ${activeTab === 'favourite' ? 'bg-frGreen text-white' : 'bg-frLightGreen text-frGreen'} rounded hover:bg-frDarkGreen transition duration-300`} onClick={() => setActiveTab('favourite')}>Favourite Recipes</button>
      </div>
      {activeTab === 'recipe' ? (
        <RecipeDetailsPopup recipe={content.data} closePopup={closePopup} />
      ) : activeTab === 'cupboard' ? (
        <MyCupboardTab closePopup={closePopup} setShowPopup={setShowPopup}/>
      ) : (
        <FavouriteRecipesTab closePopup={closePopup} />
      )}
    </div>
  );
};

export default Popup;
