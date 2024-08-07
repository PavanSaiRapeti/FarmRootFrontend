import React, { useState } from 'react';
import frNoBG from '../components/assests/png/frNoBG.png';
import { useSelector } from 'react-redux';
import RecipeGenerator from './RecipeGenerator';
import Loader from './common/Loader';

const CookingMode = () => {
  const user = useSelector((state) => state.auth.user?.data);
  const [selectedOptions, setSelectedOptions] = useState([]);

  
  
  return (
    <div className="mt-4 text-center ">
    <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md">
    <h1 className="text-5xl font-extrabold mb-8 text-center text-frGreen">Cooking Mode</h1>
      <div className="flex items-center space-x-4">
        <img src={frNoBG} alt="Profile Picture" className="w-24 h-24 " />
        <div>
          <h2 className="text-2xl font-bold text-frGreen">{user.first} {user.last}</h2>
          <p className="text-sm text-frGreen">{user.email}</p>
        </div>
      </div>
    </div>
    <RecipeGenerator ingredient={selectedOptions}/>
    
  </div>
  );
};

export default CookingMode;
