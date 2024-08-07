import { SET_LOADING, SET_ERROR_POPUP, SET_MODE, OPEN_RECIPE_POPUP } from "../../constants";

const initialState = {
  loading: false,
  errorPopup: false,
  mode: "cook",
  recipe: null,
  isOpen: false
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action?.loading,
      };
    case SET_ERROR_POPUP:
      return {
        ...state,
        errorPopup: action.errorPopup,
      };
    case SET_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case OPEN_RECIPE_POPUP:
      return {
        ...state,
        recipe: action.payload.recipe,
        isOpen: action.payload.isOpen
      };
    default:
      return state;
  }
};

export default commonReducer;
