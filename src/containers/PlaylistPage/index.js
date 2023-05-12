import { Button } from 'antd';
import styles from './PlaylistPage.module.scss';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import defaultIMG from '~/assets/imgs/default.webp';
import SongList from '~/components/SongList';
import { dataUser, listSong } from '~/selectors';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Global } from '~/components/GlobalStyle';
import { useContext } from 'react';
function PlaylistPage() {
    const { playlist } = useParams();
    const { playlists } = useSelector(dataUser);
    const dataSong = useSelector(listSong);
    const [arrSong, setArrSong] = useState([]);
    const [sort, setSort] = useState(0);
    const [srcThumb, setSrcThumb] = useState();
    const {
        handleUpdatePlaylistModal,
        handleDeletePlaylist,
        handlePlayPlaylist,
    } = useContext(Global);
    useEffect(() => {
        const newListSong = playlists.filter((it) => it.name === playlist)[0]
            .listSong;
        setArrSong(newListSong);
        if (newListSong.length)
            setSrcThumb(
                dataSong.filter((it) => it.id === newListSong[0])[0].imgURL,
            );
    }, []);
    useEffect(() => {
        if (sort) {
            const list = arrSong.map((it) => {
                return dataSong.filter((i) => i.id === it)[0];
            });
            let newListSong;
            if (sort === 1) {
                newListSong = list.sort((a, b) =>
                    a.songName.localeCompare(b.songName),
                );
            } else if (sort === -1) {
                newListSong = list.sort((a, b) =>
                    b.songName.localeCompare(a.songName),
                );
            }
            setArrSong(newListSong.map((it) => it.id));
        } else {
            const newListSong = playlists.filter(
                (it) => it.name === playlist,
            )[0].listSong;
            setArrSong(newListSong);
        }
    }, [sort]);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.left)}>
                <div className={clsx(styles.left_img)}>
                    <img src={srcThumb || defaultIMG} />
                </div>
                <div className={clsx(styles.left_left_bottom)}>
                    <span className={clsx(styles.left_name)}>{playlist} </span>
                    <Button onClick={() => handleUpdatePlaylistModal(playlist)}>
                        <i className="fa-solid fa-pen"></i>
                    </Button>
                </div>

                <Button
                    className={clsx(styles.btn)}
                    onClick={() => handlePlayPlaylist(arrSong)}
                >
                    <i className="fa-regular fa-circle-play"></i>
                    <span>phát ngẫu nhiên</span>
                </Button>
                <Button
                    className={clsx(styles.btn)}
                    onClick={() => handleDeletePlaylist(playlist)}
                >
                    <i className="fa-regular fa-circle-xmark"></i>
                    <span>xóa playlist</span>
                </Button>
            </div>
            <div className={clsx(styles.right)}>
                <div className={clsx(styles.fillters)}>
                    <Button
                        className={clsx(
                            styles.fillter,
                            !sort ? styles.active : '',
                        )}
                        onClick={() => setSort(0)}
                    >
                        mặc định
                    </Button>
                    <Button
                        className={clsx(
                            styles.fillter,
                            sort === 1 ? styles.active : '',
                        )}
                        onClick={() => setSort(1)}
                    >
                        <i class="fa-solid fa-arrow-down-a-z"></i>{' '}
                        <span>từ a - z</span>
                    </Button>
                    <Button
                        className={clsx(
                            styles.fillter,
                            sort === -1 ? styles.active : '',
                        )}
                        onClick={() => setSort(-1)}
                    >
                        <i className="fa-solid fa-arrow-up-a-z"></i>{' '}
                        <span> từ z - a</span>
                    </Button>
                    
                </div>
                <SongList listSongLibary={arrSong} title={'bài hát'} />
            </div>
        </div>
    );
}

export default PlaylistPage;
