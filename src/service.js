import { END_POINT_URL, END_PONT_URL_USER } from '~/constants';
import axios from 'axios';
const getListSongApi = () => {
    const url = `${END_POINT_URL}/songs`;
    return axios.get(url);
};
// const deleteSongId = (id) => {
//   const url = `${URL_ENDPOINT}/songs/${id}`;
//   return axios.delete(url);
// };
// const postSongSV = (payload) => {
//   const url = `${URL_ENDPOINT}/songs`;
//   return axios.post(url, payload);
// };
const updateSongSV = (payload) => {
    const url = `${END_POINT_URL}/songs/${payload.id}`;
    return axios.put(url, payload);
};
const getListUser = () => {
    const url = `${END_PONT_URL_USER}/users`;
    return axios.get(url);
};
const signupUser = (payload) => {
    const url = `${END_PONT_URL_USER}/users`;
    return axios.post(url, payload);
};
const updateUserSV = (payload) => {
    const url = `${END_PONT_URL_USER}/users/${payload.id}`;
    return axios.put(url, payload);
};
export { getListSongApi, getListUser, signupUser, updateUserSV, updateSongSV };
