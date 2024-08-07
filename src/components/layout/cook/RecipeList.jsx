import React, { useEffect, useState } from 'react';
import { RecCard } from '../../common/RecCard';
import { useSelector } from 'react-redux';
import Loader from '../../common/Loader';
import { getOtherRecipes } from '../../../api/recipes';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecipePopup from '../../RecipePopup';




const RecipeList = ({ handleClosePopup, showPopup }) => {
  const loading = useSelector((state) => state.common.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const recipes = useSelector((state) => state.reciepes.recipes);
  const isRecipePopupOpen = useSelector((state) => state.common.isOpen);
  const recipePopupContent = useSelector((state) => state.common.recipe);
  const [otherRecipes, setOtherRecipes] = useState([]);
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    if (recipes?.length === 0) {
      const fetchOtherRecipes = async () => {
        const recipesResult = await getOtherRecipes();
        setOtherRecipes(recipesResult);
      };
      fetchOtherRecipes();
    }
    console.log(otherRecipes);
  }, [recipes]);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => {
        setLoadingTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
      setLoadingTime(0);
    }
    return () => clearInterval(timer);
  }, [loading]);

  const sliderSettings = {
    dots: true, // Changed to true to show indication
    infinite: false,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true // Changed to true to show indication
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true // Changed to true to show indication
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true // Changed to true to show indication
        }
      }
    ]
  };
  if (isRecipePopupOpen) {
    return ( <>
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
        onClick={handleClosePopup}
      >
        &times;
      </button>
      <RecipePopup recipe={recipePopupContent} />
    </>)
  }


  if (showPopup) {
    return (
      <>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
          onClick={handleClosePopup}
        >
          &times;
        </button>
        {isAuthenticated && loading &&
          <>
            <Loader isTransparent={true} />
            <div className="flex justify-center items-center">
              <div className="bg-white rounded-lg p-8 max-w-4xl w-full text-center">
                <p className="text-2xl font-bold mb-4">Your recipes are generating, please wait...</p>
                {loadingTime > 5 && <p className="text-lg text-gray-500">Hmm, this is taking longer than usual. We're adding some extra magic!</p>}
                {loadingTime > 10 && <p className="text-lg text-gray-500">Almost done, just a moment...</p>}
                <img src="path_to_your_loading_gif.gif" alt="Loading" className="mx-auto" />
              </div>
            </div>
          </>}
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4 sm:p-6 md:p-8 overflow-y-auto max-h-screen">
            <div className="col-span-full">
              <h2 className="text-2xl font-bold mb-4">Generated Recipes</h2>
            </div>
            {recipes.map(recipe => (
              <div key={recipe.id} className="p-2 flex justify-center items-center">
                <RecCard recipe={recipe} />
              </div>
            ))}
          </div>
        ) : (
          <>
            {!loading && (
              <>
                <p className="text-center">No recipes found. Please try again with different ingredients.</p>
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4">You may also like</h2>
                  <div className="mt-4">
                    <Slider {...sliderSettings}>
                      {otherRecipes.recipes.length > 0 && otherRecipes.recipes.map((recipe, index) => (
                        <div className="p-2" key={recipe.id}>
                          <RecCard recipe={recipe} />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </>
    );
  }
};

export default RecipeList;
