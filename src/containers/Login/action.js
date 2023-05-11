import {
    SIGNUP,
    SIGNUP_FAILED,
    SIGNUP_SUCCESS,
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    CLEAR_TOAST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    UPDATE_USER,
    LOGOUT,
} from '~/constants';

const login = (payload) => {
    return {
        type: LOGIN,
        payload,
    };
};
const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload,
    };
};
const loginFailed = (payload) => {
    return {
        type: LOGIN_FAILED,
        payload,
    };
};
const logout = (payload) => {
    return {
        type: LOGOUT,
        payload,
    };
};
const signup = (payload) => {
    return {
        type: SIGNUP,
        payload,
    };
};
const signupSuccess = (payload) => {
    return {
        type: SIGNUP_SUCCESS,
        payload,
    };
};
const signupFailed = (payload) => {
    return {
        type: SIGNUP_FAILED,
        payload,
    };
};
const clearToast = (payload) => {
    return { type: CLEAR_TOAST, payload };
};
const updateUser = (payload) => {
    return {
        type: UPDATE_USER,
        payload,
    };
};
const updateUseSuccess = (payload) => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload,
    };
};
const updateUseFailed = (payload) => {
    return {
        type: UPDATE_USER_FAILED,
        payload,
    };
};
export {
    login,
    loginSuccess,
    loginFailed,
    signup,
    signupFailed,
    signupSuccess,
    clearToast,
    updateUser,
    updateUseSuccess,
    updateUseFailed,
    logout,
};
