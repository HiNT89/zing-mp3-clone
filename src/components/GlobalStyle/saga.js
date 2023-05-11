import { call, put } from 'redux-saga/effects';
import { getListSongApi, updateSongSV } from '~/service';
import {
    getListSongFailed,
    getListSongSuccess,
    updateSongSuccess,
    updateSongFailed,
} from '~/components/GlobalStyle/action';
function* getListSongSaga(action) {
    try {
        const response = yield call(getListSongApi);

        if (response.status === 200)
            yield put(getListSongSuccess(response.data));
    } catch (err) {
        yield put(getListSongFailed(err));
    }
}
function* handleUpdateSong(action) {
    try {
        const response = yield call(updateSongSV, action.payload);
        if (response.status === 200)
            yield put(updateSongSuccess(action.payload));
    } catch (e) {
        yield put(updateSongFailed(e));
    }
}

export { getListSongSaga, handleUpdateSong };
