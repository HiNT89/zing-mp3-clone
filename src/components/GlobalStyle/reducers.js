import {
    GET_LIST_SONG,
    GET_LIST_SONG_FAILED,
    GET_LIST_SONG_SUCCESS,
    NEXT_S0NG,
    PLAY,
    SONG_PLAY,
    PREV_SONG,
    PLAY_SONG_IN_PL,
    ADD_SONG_TO_LIST,
    DELETE_SONG_TO_LIST,
    PLAY_PLAYlIST,
    UPDATE_SONG,
    UPDATE_SONG_SUCCESS,
    UPDATE_SONG_FAILED,
} from '~/constants';
import { randomArrNumber } from '~/function';
const initState = {
    isLoading: false,
    toast: {
        title: '',
        message: '',
        type: '',
        isShow: false,
    },
    song: {},
    listSong: [],
    isPlay: false,
    listSongPlay: [],
    countSongPlay: [],
    theme: 'blue',
};

const globalReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_LIST_SONG: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case GET_LIST_SONG_SUCCESS: {
            const listArr = randomArrNumber(payload.length, 10);
            const newListSongPlay = listArr.map((it, index) =>
                index
                    ? {
                          songInfo: payload[it],

                          type: 'default',
                      }
                    : {
                          songInfo: payload[it],

                          type: 'active',
                      },
            );
            return {
                ...state,
                isLoading: false,
                listSong: payload,
                song: newListSongPlay[0].songInfo,
                listSongPlay: newListSongPlay,
                countSongPlay: [0],
            };
        }
        case GET_LIST_SONG_FAILED: {
            return {
                ...state,
                isLoading: false,
            };
        }
        case SONG_PLAY: {
            const arrSongBySinger = state.listSong.filter((it) =>
                it.singer.includes(payload.singer),
            );
            const remaining = 10 - arrSongBySinger.length;
            let listArr;
            if (remaining > 0) {
                const listSongFilter = state.listSong.filter(
                    (it) => !arrSongBySinger.includes(it),
                );
                const arrRandom = randomArrNumber(
                    listSongFilter.length,
                    remaining,
                ).map((it) => listSongFilter[it]);
                listArr = [...arrSongBySinger, ...arrRandom];
            } else {
                listArr = arrSongBySinger.slice(0, 10);
            }
            const newListSongPlay = listArr.map((it) =>
                it.id !== payload.id
                    ? {
                          songInfo: it,
                          isLibary: false,
                          type: 'default',
                      }
                    : {
                          songInfo: it,
                          isLibary: false,
                          type: 'active',
                      },
            );

            return {
                ...state,
                song: payload,
                listSongPlay: newListSongPlay,
                isPlay: false,
            };
        }
        case PLAY: {
            return { ...state, isPlay: payload };
        }
        case NEXT_S0NG: {
            const { repeat, random } = payload;
            const indexSong = state.listSongPlay
                .map((it) => it.songInfo)
                .indexOf(state.song);
            let newCurrent = indexSong + 1;
            let newSong;
            let count = state.countSongPlay;
            if (random) {
                if (repeat && !count.length - state.listSongPlay.length) {
                    count = [];
                }
                do {
                    newCurrent = Math.floor(
                        Math.random() * state.listSongPlay.length,
                    );
                } while (count.includes(newCurrent));
            } else {
                newCurrent = indexSong + 1;
            }

            if (count.length === state.listSongPlay.length && !repeat) {
                newCurrent = indexSong;
            }
            if (
                (count.length === state.listSongPlay.length ||
                    indexSong === state.listSongPlay.length - 1) &&
                repeat
            ) {
                count = [];
                newCurrent = 0;
            }
            newSong = state.listSongPlay[newCurrent].songInfo;
            count.push(newCurrent);
            const newListSongPlay = state.listSongPlay.map((it, index) =>
                index - newCurrent
                    ? { ...it, type: 'default' }
                    : { ...it, type: 'active' },
            );
            return {
                ...state,
                song: newSong,
                countSongPlay: count,
                listSongPlay: newListSongPlay,
                isPlay: false,
            };
        }
        case PREV_SONG: {
            const { repeat, random } = payload;
            const indexSong = state.listSongPlay
                .map((it) => it.songInfo)
                .indexOf(state.song);
            let newCurrent = indexSong + 1;
            let newSong;
            let count = state.countSongPlay;
            if (random) {
                if (repeat && !count.length - state.listSongPlay.length) {
                    count = [];
                }
                do {
                    newCurrent = Math.floor(
                        Math.random() * state.listSongPlay.length,
                    );
                } while (count.includes(newCurrent));
            } else {
                newCurrent = indexSong - 1;
            }

            if (count.length === state.listSongPlay.length && !repeat) {
                newCurrent = indexSong;
            }
            if (!indexSong && repeat) {
                count = [];
                newCurrent = state.listSongPlay.length - 1;
            }
            newSong = state.listSongPlay[newCurrent].songInfo;
            count.push(newCurrent);
            const newListSongPlay = state.listSongPlay.map((it, index) =>
                index - newCurrent
                    ? { ...it, type: 'default' }
                    : { ...it, type: 'active' },
            );
            return {
                ...state,
                song: newSong,
                countSongPlay: count,
                listSongPlay: newListSongPlay,
                isPlay: false,
            };
        }
        case PLAY_SONG_IN_PL: {
            const newSong = payload;
            const newListSongPlay = state.listSongPlay.map((it) =>
                it.songInfo.id !== payload.id
                    ? { ...it, type: 'default' }
                    : { ...it, type: 'active' },
            );
            return {
                ...state,
                song: newSong,
                listSongPlay: newListSongPlay,
                isPlay: false,
            };
        }
        case ADD_SONG_TO_LIST: {
            let newListSongPlay = state.listSongPlay;
            let newToast = {
                title: 'thất bại',
                message: `bài hát đã có trong danh sách phát`,
                type: 'error',
                isShow: true,
            };
            payload.forEach((element) => {
                if (
                    !state.listSongPlay.some((it) => it.songInfo.id === element)
                ) {
                    const item = state.listSong.filter(
                        (it) => it.id === element,
                    )[0];

                    newListSongPlay.push({ songInfo: item, type: 'default' });
                    newToast = {
                        title: 'thành công',
                        message: `đã thêm bài hát ${item.songName} vào danh sách phát`,
                        type: 'success',
                        isShow: true,
                    };
                }
            });

            return {
                ...state,
                listSongPlay: newListSongPlay,
                toast: newToast,
            };
        }
        case DELETE_SONG_TO_LIST: {
            let newToast = {
                title: 'thất bại',
                message: `error`,
                type: 'error',
                isShow: true,
            };
            const newListSongPlay = state.listSongPlay.filter(
                (it) => it.songInfo.id !== payload,
                (newToast = {
                    title: 'thành công',
                    message: `đã xóa bài hát  khỏi danh sách phát`,
                    type: 'success',
                    isShow: true,
                }),
            );

            return {
                ...state,
                listSongPlay: newListSongPlay,
                toast: newToast,
            };
        }
        case PLAY_PLAYlIST: {
            const arrRandom = randomArrNumber(payload.length, payload.length);
            const newPayload = arrRandom.map((it) => payload[it]);
            const newListPlay = newPayload.map((it, index) => ({
                songInfo: state.listSong.filter((i) => i.id === it)[0],
                type: index ? 'default' : 'active',
            }));
            return {
                ...state,
                song: newListPlay[0].songInfo,
                listSongPlay: newListPlay,
                isPlay: false,
            };
        }
        case UPDATE_SONG: {
            return { ...state };
        }
        case UPDATE_SONG_SUCCESS: {
            const { id } = action.payload;
            const newList = state.listSong.map((it) =>
                it.id === id ? action.payload : it,
            );
            return { ...state, listSong: newList };
        }
        case UPDATE_SONG_FAILED:
            return { ...state };
        default:
            return { ...state };
    }
};
export default globalReducer;
