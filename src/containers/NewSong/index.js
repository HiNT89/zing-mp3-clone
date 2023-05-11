import clsx from 'clsx';
import style from './NewSong.module.scss';
import bgIMG from '~/assets/imgs/new-release.2856a962.jpg';
import SongList from '~/components/SongList';
import { useEffect, useState, useContext } from 'react';
import { Global } from '~/components/GlobalStyle';
import { useParams } from 'react-router-dom';
import { dataUser, listSong } from '~/selectors';
import { useSelector } from 'react-redux';
function NewSong() {
    const { type } = useParams();
    const [lisSongCategory, setListSongCategory] = useState([]);
    const listSongData = useSelector(listSong);
    const user = useSelector(dataUser);
    const { handleAddSongToList } = useContext(Global);
    useEffect(() => {
        if (type === 'all') {
            const newListSong = listSongData
                .sort(
                    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate),
                )
                .map((it) => it.id);
            setListSongCategory(newListSong);
        } else if (type === 'vn') {
            const newLisSongCategory = listSongData
                .filter((it) => it.type.includes('Việt Nam'))
                .sort(
                    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate),
                )
                .slice(0, 12);
            setListSongCategory(newLisSongCategory);
        } else {
            const newLisSongCategory = listSongData
                .filter((it) => !it.type.includes('Việt Nam'))
                .sort(
                    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate),
                )
                .map((it) => it.id);
            setListSongCategory(newLisSongCategory);
        }
    }, [type]);
    console.log(lisSongCategory);
    return (
        <div className={clsx(style.wrapper)}>
            <h1>
                Mới Phát Hành <i className="fa-solid fa-circle-play"></i>
            </h1>
            <SongList
                listSongLibary={lisSongCategory}
                title={'bài hát mới nhất'}
            />
        </div>
    );
}

export default NewSong;
