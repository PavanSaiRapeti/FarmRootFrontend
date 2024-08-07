import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import AnimatedLogo from './components/AnimatedLogo';
import RegisterPage from './pages/RegisterPage';
import AboutUsPage from './pages/aboutUs';

function App({ isLoggedIn }) {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<AnimatedLogo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route
          path="/profile"
          element={isLoggedIn ? <MainPage /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);