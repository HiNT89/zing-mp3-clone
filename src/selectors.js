import { createSelector } from 'reselect';
const stateGlobal = (state) => state.globalReducer;
const stateLogin = (state) => state.loginReducer;
// global
const isLoading = createSelector(stateGlobal, (state) => state.isLoading);
const listSong = createSelector(stateGlobal, (state) => state.listSong);
const song = createSelector(stateGlobal, (state) => state.song);
const play = createSelector(stateGlobal, (state) => state.isPlay);
const listSongPlay = createSelector(stateGlobal, (state) => state.listSongPlay);
const theme = createSelector(stateGlobal, (state) => state.theme);
const toast = createSelector(stateGlobal, (state) => state.toast);
// login
const dataUser = createSelector(stateLogin, (state) => state.user);
const loadingLogin = createSelector(stateLogin, (state) => state.isLoading);
const toastLogin = createSelector(stateLogin, (state) => state.toast);
const loginStatus = createSelector(stateLogin, (state) => state.isLogin);

export {
    isLoading,
    listSong,
    loadingLogin,
    toastLogin,
    loginStatus,
    song,
    play,
    listSongPlay,
    dataUser,
    theme,
    toast,
};
