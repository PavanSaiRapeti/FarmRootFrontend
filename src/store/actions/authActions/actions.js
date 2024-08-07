import { LOGIN_REQUEST, REGISTER_REQUEST,LOGOUT_REQUEST, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../../constants';

export const loginRequest = (email, password , mode) => ({
    type: LOGIN_REQUEST,
    payload: { email, password , mode}
});

export const registerRequest = (first , last , email, password) => ({
    type: REGISTER_REQUEST,
    payload: {first , last , email, password}
});
export const logoutRequest = () => ({
    type: LOGOUT_REQUEST
});
export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
});
export const registerSuccess = (data) => ({
    type: REGISTER_SUCCESS,
    payload: data
});
export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});
