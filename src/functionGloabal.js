import { useDispatch } from 'react-redux';
import { playSong, songPlay } from '~/components/GlobalStyle/action';
export const handleChangeSong = async (it) => {
    const dispatch = useDispatch;
    await dispatch(playSong(false));
    await dispatch(songPlay(it));
};
