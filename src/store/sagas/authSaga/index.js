import { put, call } from 'redux-saga/effects';
import { clearUserId, login, register, setToken, setUserId } from '../../../api/authApi';
import { loginSuccess, logoutSuccess, registerSuccess } from '../../actions/authActions/actions';
import { setErrorPopup, setLoading } from '../../actions/common/actions';

export function* loginSaga(action) {
    try {
        const response = yield call(login, action.payload);
        if (response.isAuthenticated) {
            const token = response.token;
            setToken(token);
            setUserId(response.userId);
            yield put(loginSuccess({user: response , isAuthenticated: response.isAuthenticated}));
        } else {
            yield put(setErrorPopup(response.error));
        }
    } catch (error) {
        yield put(setErrorPopup(error.response.data.message));
    }
}

export function* registerSaga(action) {
    try {
        const response = yield call(register, action.payload);
        if (response) {
            yield put(registerSuccess({isRegistered: response?.isRegistered }));
            yield put(setErrorPopup("user registered sucessfully"));
        } else {
            yield put(setErrorPopup(response.error));
        }
    } catch (error) {
        yield put(setErrorPopup(error?.response?.data?.error || "registeration failed"));
    }
}
export function* logoutSaga() {
    try {
        localStorage.removeItem('token');
        clearUserId();
        yield put(logoutSuccess());
    } catch (error) {
        yield put(setErrorPopup(error.message));
    }
}
