import React from 'react';
const FrButton = ({ width = 10, text, onClick=()=>{}, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{width: width +"rem"}}
      className={`rounded-3xl  h-auto text-frBlack bg-frGreen text-sm py-2 px-4 hover:bg-opacity-80 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-frGreen`}
    >
      {text}
    </button>
  );
};

export default FrButton;