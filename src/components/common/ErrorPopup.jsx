import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorPopup } from '../../store/actions/common/actions';

export  const CancelCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#768350"} fill={"none"} {...props}>
    <path d="M15.7494 15L9.75 9M9.75064 15L15.75 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22C18.2728 22 22.75 17.5228 22.75 12Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);


const ErrorPopup = () => {
  const dispatch = useDispatch();
  const errorPopup = useSelector(state => state.common.errorPopup);


  const handleClose = () => {
    dispatch(setErrorPopup(false)); 
  };

  return (
    <div className={`fixed bottom-10 left-1/3 transform -translate-x-1/2 bg-frGray text-red-500 p-4 w-1/3 rounded-xl shadow-lg ${errorPopup ? 'block animate-jump' : 'hidden'}`}>
      <div className="flex justify-center items-center">
         <div onClick={handleClose} className="text-white cursor-pointer">
         <CancelCircleIcon/>
         </div>
        <p className='font-bold'>{errorPopup}</p>
      </div>
    </div>
  );
};

export default ErrorPopup;