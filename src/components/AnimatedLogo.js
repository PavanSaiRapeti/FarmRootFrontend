import React from "react";
import FrButton from "./common/FrButton";
import frNoBG from '../components/assests/png/frNoBG.png';

import { useNavigate } from 'react-router-dom';

const AnimatedLogo = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col bg-frWhite pt-8 justify-center">
      <div className="flex justify-center mt-16 items-center animate-jump w-screen">
          <img src={frNoBG} alt="Logo" className="w-1/3" />
      </div>
      <div className="mt-8 flex flex-col justify-center items-center">
          <FrButton
            onClick={() => navigate('/login')}
            text={"Login"}
            width={8}
            textColor={"frBlack"}
            height={"2"}
            bgColor={"frGreen"}
          />
          <span className="text-sm mt-4">
            Create a new account ?
            <a onClick={() => navigate('/register')} className="text-frGreen hover:underline text-sm ml-4">
              Signup
            </a>
          </span>
      </div>
    </div>
  );
};

export default AnimatedLogo;