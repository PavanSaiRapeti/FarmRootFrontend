// reducer.js
import { FETCH_RECIPES, FETCH_RECIPES_SUCCESS, FETCH_RECIPES_FAILURE } from '../../constants';

const initialState = {
  recipes: [],
  loading: false,
  error: null,
};

const reciepesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: action.payload.recipes,
        loading: false,
        error: null,
      };
    case FETCH_RECIPES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reciepesReducer;