import { FETCH_RECIPES, FETCH_RECIPES_FAILURE, FETCH_RECIPES_SUCCESS } from "../../constants";

export const fetchRecipes = (ingredients) => ({
    type: FETCH_RECIPES,
    payload: { ingredients },
  });
  
  export const fetchRecipesSuccess = (recipes) => ({
    type: FETCH_RECIPES_SUCCESS,
    payload: { recipes },
  });
  
  export const fetchRecipesFailure = (error) => ({
    type: FETCH_RECIPES_FAILURE,
    payload: { error },
  });