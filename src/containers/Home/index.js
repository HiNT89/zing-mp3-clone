import { useDispatch, useSelector } from 'react-redux';
import { dataURL, listSingerURL } from './dataURL';
import Singers from './components/Singers';
import Slide from '~/components/Slide/index';
import NewSong from './components/NewSong';
import Suggest from './components/Suggest';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import style from './Home.module.scss';
import { listSong, play, song } from '~/selectors';
import Category from '~/components/Category';
import { useContext } from 'react';
import { Global } from '~/components/GlobalStyle';
import Zingchart from './components/Zingchart';

function Home() {
    const { handleChangeSong, handleUpdateUser, dataTheme } =
        useContext(Global);
    const dispatch = useDispatch();
    // selector
    const listSongData = useSelector(listSong);
    const songInfo = useSelector(song);
    const isPlay = useSelector(play);
    // let charts;
    const [listSongSuggest, setListSongSuggest] = useState([]);
    const [listNewSong, setListNewSong] = useState([]);

    useEffect(() => {
        const current = Math.floor(Math.random() * listSongData.length);
        const arr = [current - 2, current - 1, current, +1, current + 2];
        const newList = arr.map((it) => listSongData[it]);
        setListSongSuggest(newList);
        const newListSong = listSongData
            .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
            .slice(0, 3);
        setListNewSong(newListSong);
    }, []);
    return (
        <div className={clsx(style.wrapper)}>
            {/* slide */}
            <Slide dataURL={dataURL} />
            {/* new */}
            <Category
                handleChangeSong={handleChangeSong}
                handleUpdateUser={handleUpdateUser}
                dataLayout={{ col: 3 }}
                dataTheme={dataTheme}
            />
            {/*  category */}
            <Suggest
                listData={listSongSuggest}
                handleChangeSong={handleChangeSong}
                handleUpdateUser={handleUpdateUser}
                dataTheme={dataTheme}
            />
            {/* singers */}
            <Singers listSingers={listSingerURL} />
            {/* new song */}
            <NewSong
                listData={listNewSong}
                handleChangeSong={handleChangeSong}
                dataTheme={dataTheme}
            />

            {/* //// */}
            <Zingchart
                dataTheme={dataTheme}
                handleChangeSong={handleChangeSong}
            />
        </div>
    );
}

export default Home;
