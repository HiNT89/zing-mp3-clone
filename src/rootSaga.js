import { all, takeEvery } from 'redux-saga/effects';
import {
    GET_LIST_SONG,
    LOGIN,
    SIGNUP,
    UPDATE_SONG,
    UPDATE_USER,
} from '~/constants';
import { loginSaga, signupSaga, updateUserSaga } from './containers/Login/saga';
import {
    getListSongSaga,
    handleUpdateSong,
} from './components/GlobalStyle/saga';
export default function* rootSaga() {
    yield all([
        takeEvery(GET_LIST_SONG, getListSongSaga),
        takeEvery(LOGIN, loginSaga),
        takeEvery(SIGNUP, signupSaga),
        takeEvery(UPDATE_USER, updateUserSaga),
        takeEvery(UPDATE_SONG, handleUpdateSong),
        // takeEvery(DELETE_SONG, handleDeleteSong),
        // takeEvery(POST_SONG, handlePostSong),
    ]);
}
