import { call, put } from 'redux-saga/effects';
import { getListUser, signupUser, updateUserSV } from '~/service';
import {
    loginSuccess,
    loginFailed,
    signupFailed,
    signupSuccess,
    updateUseSuccess,
    updateUseFailed,
} from './action';
function* loginSaga(action) {
    try {
        const response = yield call(getListUser);
        const arr = response.data;
        const user = arr.filter(
            (it) => it.userName === action.payload.userName,
        );
        if (!user.length) {
            yield put(loginFailed('tai khoan khong ton tai'));
        } else if (user[0].password !== action.payload.password) {
            yield put(loginFailed('mat khau khong chinh xac'));
        } else {
            yield put(loginSuccess(user));
        }
    } catch (err) {
        yield put(loginFailed(err));
    }
}
function* signupSaga(action) {
    try {
        const response = yield call(getListUser);
        const arr = response.data;
        const user = arr.filter(
            (it) => it.userName === action.payload.userName,
        );
        const userExist = !user.length;
        if (userExist) {
            const responseSignup = yield call(signupUser, action.payload);
            if (responseSignup.status === 201)
                yield put(signupSuccess(responseSignup.data));
        } else {
            yield put(signupFailed('tai khoan da ton tai'));
        }
    } catch (err) {
        yield put(signupFailed(err));
    }
}
function* updateUserSaga(action) {
    try {
        const response = yield call(updateUserSV, action.payload);
        if (response.status === 200) yield put(updateUseSuccess(response.data));
    } catch (err) {
        yield put(updateUseFailed(err));
    }
}
export { loginSaga, signupSaga, updateUserSaga };
