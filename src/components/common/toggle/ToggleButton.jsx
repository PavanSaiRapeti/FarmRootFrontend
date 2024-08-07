import React, { useEffect, useState } from 'react';
import './ToggleButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../../store/actions/common/actions';

export const HelpCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} color={"#35452B"} fill={"none"} {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11.992 17H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


const ToggleButton = ({type}) => {
  const dispatch =useDispatch()
  const mode = useSelector(state => state.common.mode);
  const isCookMode = mode ==="cook" ? true : false;
  
  const toggle = () => {
    dispatch(setMode( isCookMode ? "farm" : "cook"))
  }
  
  return (
    <div className='flex flex-row pl-16 ali items-center gap-2'>
    <button type={type} className={`toggle toggle-width toggle-height ${!isCookMode ? 'on' : 'off'}`} onClick={toggle}>
      <span className="pin" />
    </button>
    <p className='text-xs'>{!isCookMode ? 'Farmer Mode' : 'Cooking mode'}</p>
    <div className="tooltip">
      <span><HelpCircleIcon /><span className="tooltiptext text-xs">Toggle between Cooking Mode and Farmer Mode to switch between recipe suggestions and farm related management.</span></span>
    </div>
  </div>
  );
};

export default ToggleButton;

