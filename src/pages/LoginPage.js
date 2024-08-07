import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../store/actions/authActions/actions";
import whiteLogo from "../components/assests/png/whiteLogo.png";
import Card from "../components/common/Card";
import Loader from "../components/common/Loader";
import ErrorPopup from "../components/common/ErrorPopup";
import FrButton from "../components/common/FrButton";
import Slider from "../components/common/slider/Slider";
import ToggleButton from "../components/common/toggle/ToggleButton";
import { setErrorPopup, setLoading, setMode } from "../store/actions/common/actions";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from "react-router-dom";

export const slideItems = [
  {
    image: require('../components/assests/image1.jpeg'),
    title: "About FarmRoots",
    description: [
      "Fresh produce, empowered farmers, healthy living.",
      "Experience the taste of sustainability, locally sourced.",
      "Nourish your body, support your community.",
      "Discover the power of farm-to-table, every day.",
      "Savor the flavor, feel the freshness.",
      "Join the movement, eat with purpose.",
      "FarmRoots: where every bite makes a difference."
    ]
  },
  {
    image: require('../components/assests/Image2.jpg'),
    title: "Cooking with Ease",
    description: [
      "Explore recipes, savor freshness, delight in local flavors.",
      "Unleash your culinary creativity with our seasonal ingredients.",
      "Taste the difference, feel the freshness.",
      "Get inspired, cook with love, share with joy.",
      "Farm-fresh ingredients, endless possibilities.",
      "Cooking with FarmRoots, a recipe for success.",
      "Where every meal is a celebration of flavor and community."
    ]
  },
  {
    image: require('../components/assests/image3.jpg'),
    title: "Farmer Mode",
    description: [
      "Amplify your reach, showcase products, thrive with FarmRoots.",
      "Connect with consumers, grow your business, sustainably.",
      "Empower your farm, enrich your community.",
      "FarmRoots: your partner in sustainable agriculture.",
      "Reach new heights, cultivate success.",
      "Where farmers and consumers come together, in harmony.",
      "FarmRoots: the future of farming, today."
    ]
  }
];

const LoginPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.common.loading);
  const errorLogin = useSelector((state) => state.common.errorPopup);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    dispatch(loginRequest(values.email, values.password));
    dispatch(setLoading(true));
  };

  useEffect(() => {
    dispatch(setErrorPopup(false))
    if (isAuthenticated) {
      dispatch(setLoading(false));
      navigate('/profile')
    }
    dispatch(setLoading(false));
  }, [isAuthenticated, loading]);

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
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <Formik
                initialValues={{ email: '', password: '' }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = 'Required';
                  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                  }
                  if (!values.password) {
                    errors.password = 'Required';
                  } 
                  return errors;
                }}
                onSubmit={handleLogin}
              >
                {({ isSubmitting, isValid }) => (
                  <Form>
                    <div>
                      <label className="block mb-2">
                        Email:
                        <Field type="email" name="email" className="block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                      </label>
                      <label className="block mb-2 relative">
                        Password:
                        <Field type="password" name="password" className="block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                      </label>
                      <div className="flex flex-row items-center">
                        <FrButton width={8} type="submit" text={"login"} disabled={isSubmitting || !isValid} />
                        <ToggleButton type={'button'} />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
              
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Don't have an account?</p>
                <a
                  href="/register"
                  className="text-frGreen font-bold py-2 px-4 rounded ml-2 hover:underline"
                >
                  Signup
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
