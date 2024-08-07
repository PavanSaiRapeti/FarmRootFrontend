import React from 'react';
import whiteLogo from '../assests/png/whiteLogo.png';
import Cart from '../assests/png/Cart.png';
import Info from '../assests/png/Info.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../../store/actions/authActions/actions';
import { setLoading, setMode } from '../../store/actions/common/actions';
import HeaderToggle from '../common/toggle/HeaderToggle';
import FrButton from '../common/FrButton';

const Header = () => {
    const mode = useSelector(state => state.common.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(setLoading(true));
        dispatch(logoutSuccess());
        dispatch(setMode("cook"))
        navigate('/login');     
    };
    return (

        <header className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-frGreen to-frGreendark text-white h-20">
           
            <div className="header-left">
                <img src={whiteLogo} alt="Logo" className="h-16" />
            </div>
            <div className="header-center">
             <div title="Toggle Navigation">
                <HeaderToggle />
            </div>
            </div>
            <div className="header-right flex items-center">
                <span className="profile-icon mr-4 cursor-pointer flex flex-col items-center" onClick={() => navigate('/aboutUs')}>
                    <img src={Info} alt="Profile Icon" className="h-8" />
                    <span className="text-xs text-frWhite ">About us</span>
                </span>
                {mode === "farm" && (
                  <span className="cart-icon mr-4 cursor-pointer flex flex-col items-center">
                    <img src={Cart} alt="Cart Icon" className="h-8" />
                    <span className="text-xs text-frWhite">Cart</span>
                  </span>
                )}
                <FrButton onClick={handleLogout} width={8} type="submit" text={"logout"}  />
            </div>
        </header>
    );
};

export default Header;