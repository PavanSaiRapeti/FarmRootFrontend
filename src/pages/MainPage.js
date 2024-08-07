import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Loader from "../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { validateToken } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { setErrorPopup, setLoading } from "../store/actions/common/actions";
import CookingMode from "../components/CookingMode";
import FarmerMode from "../components/FarmerMode";
import ErrorPopup from "../components/common/ErrorPopup";
import { logoutSuccess } from "../store/actions/authActions/actions";

const MainPage = () => {
  const mode = useSelector((state) => state.common.mode);
  const loading = useSelector((state) => state.common.loading);
  const errorPopup = useSelector((state) => state.common.errorPopup); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [tokenValidated, setTokenValidated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      dispatch(setLoading(true));
      try {
        let token = await validateToken();
        if (!token) {
         dispatch(logoutSuccess());
          navigate("/login");
        } else {
          setTokenValidated(true);
          dispatch(setLoading(false));
        }
      } catch (error) {
        dispatch(logoutSuccess());
        dispatch(setErrorPopup("Token validation failed"));
        navigate("/login");
      }
    };
    if (!tokenValidated) {
      checkToken();
    }
  }, [dispatch, navigate, tokenValidated]);

  if (loading && !isAuthenticated) {
    return <Loader />;
  }

  return (
    <div className="bg-frWhite h-screen">
      <Header />
      {mode === 'cook' && <CookingMode />}
      {mode === 'farm' && <FarmerMode />}
      {errorPopup && <ErrorPopup />} 
    </div>
  );
};

export default MainPage;
