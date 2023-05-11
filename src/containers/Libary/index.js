import clsx from 'clsx';
import style from './Libary.module.scss';

import SongList from '~/components/SongList';
import { useSelector } from 'react-redux';
import Playlist from './components/PlaylistList';
import { dataUser } from '~/selectors';

function Libary() {
    const { mySong, playlists, dataTheme } = useSelector(dataUser);
    return (
        <div className={clsx(style.wrapper)}>
            <h1>
                thư viện <i className="fa-solid fa-circle-play"></i>
            </h1>
            <Playlist playlist={playlists || []} />
            <SongList
                listSongLibary={mySong}
                title={'bài hát yêu thích'}
                dataTheme={dataTheme}
            />
        </div>
    );
}

export default Libary;
