import React, { useEffect, useState } from 'react';
import './ToggleButton.css';
import { useDispatch, useSelector } from 'react-redux';
import farmModeLogo from '../../assests/png/farmModeLogo.png';
import cookModeLogo from '../../assests/png/cookModeLogo.png';
import { setMode } from '../../../store/actions/common/actions';



const HeaderToggle = ({type}) => {
  const dispatch =useDispatch()
  const mode = useSelector(state => state.common.mode);
  const isCookMode = mode ==="cook" ? true : false;
  
  const toggle = () => {
    dispatch(setMode( isCookMode ? "farm" : "cook"))
  }
  
  return (
    <div className='flex flex-row pl-16 ali items-center gap-2 '>
    <button type={type} className={`toggle w-24 h-12 ${!isCookMode ? 'on' : 'off'}`} onClick={toggle}>
    <div title={!isCookMode ? 'Switch to Cook Mode' : 'Switch to Farm Mode'} className="headPin flex items-center justify-center h-12 w-12 bg-frGray border-2 border-frGreendark rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 drop-shadow-lg">
            <button className=' bg-transparent contents'>
                    <img src={!isCookMode ? farmModeLogo : cookModeLogo} alt="Logo" className="h-8" style={{ transition: 'all 0.5s ease-in-out' }} /> 
            </button>
        </div>
    </button>

    </div>
  );
};

export default HeaderToggle;
