import clsx from 'clsx';
import style from './Category.module.scss';
import { Button } from 'antd';
import { useEffect, useState, useContext } from 'react';
import { listSong, dataUser, theme } from '~/selectors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Global } from '../GlobalStyle';
import ButtonAddToPlaylist from '../ButtonAddToPlaylist';
function Category({
    handleChangeSong,
    dataLayout,
    handleUpdateUser,
    dataTheme,
}) {
    const [typeSong, setTypeSong] = useState('all');
    const [lisSongCategory, setListSongCategory] = useState([]);
    const listSongData = useSelector(listSong);
    const user = useSelector(dataUser);
    const { handleAddSongToList } = useContext(Global);
    useEffect(() => {
        if (typeSong === 'all') {
            const newListSong = listSongData
                .sort(
                    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate),
                )
                .slice(0, 12);
            setListSongCategory(newListSong);
        } else if (typeSong === 'vn') {
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
                .slice(0, 12);
            setListSongCategory(newLisSongCategory);
        }
    }, [typeSong]);
    const widthItem = `calc((100% / ${dataLayout.col}) - 15px )`;
    return (
        <div className={clsx(style.wrapper)}>
            <div className={clsx(style.top)}>
                <h3 className={clsx(style.top_title)}>mới phát hành</h3>
                <Link
                    to={`/new-song/${typeSong}`}
                    className={clsx(style.top_btn)}
                >
                    tất cả <i className="fa-solid fa-chevron-right"></i>
                </Link>
            </div>

            <div className={clsx(style.filters)}>
                {typeSong === 'all' ? (
                    <Button
                        className={clsx(style.filter, style.active)}
                        onClick={() => setTypeSong('all')}
                        style={{
                            backgroundColor: `${dataTheme.bgColorBtn}`,
                            borderColor: `${dataTheme.bgColorBtn}`,
                        }}
                    >
                        Tất cả
                    </Button>
                ) : (
                    <Button
                        className={clsx(style.filter)}
                        onClick={() => setTypeSong('all')}
                    >
                        Tất cả
                    </Button>
                )}
                {/* --- */}
                {typeSong === 'vn' ? (
                    <Button
                        className={clsx(style.filter, style.active)}
                        onClick={() => setTypeSong('vn')}
                        style={{
                            backgroundColor: `${dataTheme.bgColorBtn}`,
                            borderColor: `${dataTheme.bgColorBtn}`,
                        }}
                    >
                        việt nam
                    </Button>
                ) : (
                    <Button
                        className={clsx(style.filter)}
                        onClick={() => setTypeSong('vn')}
                    >
                        việt nam
                    </Button>
                )}
                {typeSong === 'nc' ? (
                    <Button
                        className={clsx(style.filter, style.active)}
                        onClick={() => setTypeSong('nc')}
                        style={{
                            backgroundColor: `${dataTheme.bgColorBtn}`,
                            borderColor: `${dataTheme.bgColorBtn}`,
                        }}
                    >
                        quốc tế
                    </Button>
                ) : (
                    <Button
                        className={clsx(style.filter)}
                        onClick={() => setTypeSong('nc')}
                    >
                        quốc tế
                    </Button>
                )}
            </div>
            <div className={clsx(style.list)}>
                {lisSongCategory.map((it, index) => (
                    <div
                        className={clsx(style.item)}
                        style={{ width: `${widthItem}` }}
                        key={it.id}
                    >
                        <img src={it.imgURL} alt="img" />
                        <div className={clsx(style.item_info)}>
                            <b>{it.songName}</b>
                            <span>{it.singer}</span>
                            <span>{it.releaseDate}</span>
                        </div>
                        <div className={clsx(style.item_before)}>
                            <Button
                                className={clsx(style.item_btn)}
                                onClick={() => handleChangeSong(it)}
                            >
                                <i className="fa-solid fa-play"></i>
                            </Button>
                            <div>
                                {user.mySong.includes(it.id) ? (
                                    <Button
                                        className={clsx(style.item_btn_active)}
                                        onClick={() =>
                                            handleUpdateUser(
                                                it.id,
                                                'updateMySong',
                                            )
                                        }
                                        style={{
                                            color: `${dataTheme.bgColorBtn}`,
                                        }}
                                    >
                                        <i className="fa-solid fa-heart"></i>
                                    </Button>
                                ) : (
                                    <Button
                                        className={clsx(style.item_btn)}
                                        onClick={() =>
                                            handleUpdateUser(
                                                it.id,
                                                'updateMySong',
                                            )
                                        }
                                    >
                                        <i className="fa-solid fa-heart"></i>
                                    </Button>
                                )}

                                <ButtonAddToPlaylist
                                    listPlaylist={user.playlists || []}
                                    handleAddSongToList={handleAddSongToList}
                                    song={it}
                                    handleUpdateUser={handleUpdateUser}
                                    isItemLastRow={
                                        (index + 1) % dataLayout.col === 0
                                    }
                                    dataTheme={dataTheme}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Category;
