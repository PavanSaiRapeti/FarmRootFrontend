import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../store/actions/authActions/actions";
import whiteLogo from '../components/assests/png/whiteLogo.png';
import Card from "../components/common/Card";
import Loader from "../components/common/Loader";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ErrorPopup from "../components/common/ErrorPopup";
import FrButton from "../components/common/FrButton";
import Slider from "../components/common/slider/Slider";
import { slideItems } from "../pages/LoginPage";
import { setErrorPopup } from "../store/actions/common/actions";

const RegisterForm = ({handleRegister}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.firstName) {
          errors.firstName = 'Required';
        }
        if (!values.lastName) {
          errors.lastName = 'Required';
        }
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Required';
        } else if (values.password.length < 8) {
          errors.password = 'Password must be at least 8 characters';
        }
        if (!values.confirmPassword) {
          errors.confirmPassword = 'Required';
        } else if (values.confirmPassword !== values.password) {
          errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleRegister(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
           <h2 className="text-2xl font-bold mb-4">Register</h2>
          <div>
            <label className="block mb-2">
              First Name:
              <Field type="text" name="firstName" className="block w-full p-2 border border-gray-300 rounded-md" />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
            </label>
            <label className="block mb-2">
              Last Name:
              <Field type="text" name="lastName" className="block w-full p-2 border border-gray-300 rounded-md" />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
            </label>
            <label className="block mb-2">
              Email:
              <Field type="email" name="email" className="block w-full p-2 border border-gray-300 rounded-md" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </label>
            <label className="block mb-2 relative">
              Password:
              <Field type={showPassword ? "text" : "password"} name="password" className="block w-full p-2 border border-gray-300 rounded-md" />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </span>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </label>
            <label className="block mb-2 relative">
              Confirm Password:
              <Field type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className="block w-full p-2 border border-gray-300 rounded-md" />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </span>
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
            </label>
            <div className="flex flex-row items-center">
              <FrButton width={8} type="submit" text={"Register"} disabled={isSubmitting || !isValid} />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const RegisterPage = () => {
  const isRegistered = useSelector((state) => state.auth.isRegistered);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const errorLogin = useSelector((state) => state.common.errorPopup);;
  const loading = useSelector((state) => state.common.loading);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleRegister = async (values) => {
    if (!values.firstName || !values.lastName || !values.email || !values.password || !values.confirmPassword) {
      setError("Please fill in all the fields.");
      dispatch(setErrorPopup("Please fill in all the fields."));
      return;
    }
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      dispatch(setErrorPopup("Passwords do not match."));
      return;
    }
    dispatch(registerRequest(values.firstName, values.lastName, values.email, values.password));
  };



  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="w-full h-screen flex flex-col items-center bg-frGreen">
        <div className="flex flex-wrap w-36 h-24 p-4 justify-center cursor-pointer" onClick={() => window.location.href = "/home"}>
          <img src={whiteLogo} alt="Logo" />
        </div>
        <div className="w-full h-full flex">
          <div className="w-1/2 p-4">
            <Slider slideItems={slideItems}/>
          </div>
          <div className="w-1/2 px-20 flex justify-center h-auto m-auto">
            <Card>
             <div>{errorLogin ? <ErrorPopup errorMessage={errorLogin} /> : ""}</div>
              <RegisterForm handleRegister={handleRegister}/>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Already have an account?</p>
                <a
                  href="/login"
                  className="text-frGreen font-bold py-2 px-4 rounded ml-2 hover:underline"
                >
                  Login
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
