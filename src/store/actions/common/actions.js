import { OPEN_RECIPE_POPUP, SET_ERROR_POPUP, SET_MODE } from '../../constants';
import { SET_LOADING } from '../../constants';

export const setErrorPopup = (errorPopup) => ({
    type: SET_ERROR_POPUP,
    errorPopup
});

export const setLoading = (loading) => ({
    type: SET_LOADING,
    loading
});
export const setMode = (mode) => ({
    type: SET_MODE,
    payload: mode
});
export const openRecipePopup = (recipe,isOpen) => ({
    type: OPEN_RECIPE_POPUP,
    payload: {
        recipe,
        isOpen
    }
});

