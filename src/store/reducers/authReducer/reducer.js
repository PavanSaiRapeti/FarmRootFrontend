import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, REGISTER_SUCCESS } from '../../constants';

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
    isRegistered: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: action?.payload?.isAuthenticated,
                user: action?.payload?.user,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action?.error
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegistered: action?.payload?.isRegistered,
                error: null,
            };
        default:
            return state;
    }
};

export default authReducer;
