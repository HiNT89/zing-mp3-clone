import {
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    SIGNUP,
    SIGNUP_FAILED,
    SIGNUP_SUCCESS,
    CLEAR_TOAST,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    LOGOUT,
} from '~/constants';
const initState = {
    isLoading: false,
    isLogin: false,
    user: {},
    toast: {
        title: '',
        message: '',
        type: '',
        isShow: false,
    },
};
const loginReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case CLEAR_TOAST: {
            return {
                ...state,
                toast: {
                    title: '',
                    message: '',
                    type: '',
                    isShow: false,
                },
            };
        }
        case LOGIN: {
            return { ...state, isLoading: true };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                user: payload[0],
                isLogin: true,
            };
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                isLoading: false,
                isLogin: false,
                toast: {
                    title: 'That bai',
                    message: payload,
                    type: 'error',
                    isShow: true,
                },
            };
        }
        case LOGOUT: {
            return {
                isLoading: false,
                isLogin: false,
                user: {},
                toast: {
                    title: '',
                    message: '',
                    type: '',
                    isShow: false,
                },
            };
        }
        case SIGNUP: {
            return {
                ...state,
                isLoading: true,
                toast: {
                    title: '',
                    message: '',
                    type: '',
                    isShow: false,
                },
            };
        }
        case SIGNUP_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                user: payload,
                isLogin: true,
                toast: {
                    title: 'Thanh cong',
                    message: 'ban da dang ki thanh cong',
                    type: 'success',
                    isShow: true,
                },
            };
        }
        case SIGNUP_FAILED: {
            return {
                ...state,
                isLoading: false,
                isLogin: false,
                toast: {
                    title: 'That bai',
                    message: payload,
                    type: 'error',
                    isShow: true,
                },
            };
        }
        case UPDATE_USER: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                user: payload,
                isLoading: false,
            };
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                isLoading: false,
            };
        }
        default: {
            return { ...state };
        }
    }
};
export default loginReducer;
