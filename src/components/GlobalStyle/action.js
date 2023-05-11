import {
    PLAY,
    GET_LIST_SONG,
    GET_LIST_SONG_FAILED,
    GET_LIST_SONG_SUCCESS,
    SONG_PLAY,
    NEXT_S0NG,
    PREV_SONG,
    PLAY_SONG_IN_PL,
    ADD_SONG_TO_LIST,
    DELETE_SONG_TO_LIST,
    PLAY_PLAYlIST,
    UPDATE_SONG,
    UPDATE_SONG_FAILED,
    UPDATE_SONG_SUCCESS,
} from '~/constants';
const getListSong = (payload) => {
    return {
        type: GET_LIST_SONG,
        payload,
    };
};
const getListSongSuccess = (payload) => {
    return {
        type: GET_LIST_SONG_SUCCESS,
        payload,
    };
};
const getListSongFailed = (payload) => {
    return {
        type: GET_LIST_SONG_FAILED,
        payload,
    };
};
const songPlay = (payload) => {
    return { type: SONG_PLAY, payload };
};
const playSong = (payload) => {
    return {
        type: PLAY,
        payload,
    };
};
const nextSong = (payload) => {
    return {
        type: NEXT_S0NG,
        payload,
    };
};
const prevSong = (payload) => {
    return {
        type: PREV_SONG,
        payload,
    };
};
const playSongInPL = (payload) => {
    return {
        type: PLAY_SONG_IN_PL,
        payload,
    };
};
const addSongToList = (payload) => {
    return {
        type: ADD_SONG_TO_LIST,
        payload,
    };
};
const deleteSongInList = (payload) => {
    return {
        type: DELETE_SONG_TO_LIST,
        payload,
    };
};
const playPlaylist = (payload) => {
    return {
        type: PLAY_PLAYlIST,
        payload,
    };
};
const updateSong = (payload) => {
    return {
        type: UPDATE_SONG,
        payload,
    };
};
const updateSongSuccess = (payload) => {
    return {
        type: UPDATE_SONG_SUCCESS,
        payload,
    };
};
const updateSongFailed = (err) => {
    return {
        type: UPDATE_SONG_FAILED,
        err,
    };
};
export {
    getListSong,
    getListSongSuccess,
    getListSongFailed,
    songPlay,
    playSong,
    nextSong,
    prevSong,
    playSongInPL,
    addSongToList,
    deleteSongInList,
    playPlaylist,
    updateSong,
    updateSongFailed,
    updateSongSuccess,
};
