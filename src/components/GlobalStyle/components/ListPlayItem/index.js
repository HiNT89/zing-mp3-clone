import clsx from 'clsx';
import style from './ListPlayItem.module.scss';
import defaultIMG from '~/assets/imgs/default.webp';
import { useSelector } from 'react-redux';
import { dataUser } from '~/selectors';
function ListPlayItem({
    data,
    handleDeleteSongInList,
    handleChangeSongInPL,
    handleUpdateUser,
    typeListPlay,
    handleChangeSong,
    dataTheme,
}) {
    const { type, songInfo } = data;
    const { mySong } = useSelector(dataUser);

    return (
        <div>
            {type === 'active' ? (
                <div
                    className={clsx(style.wrapper, style.active)}
                    style={{
                        backgroundColor: `${dataTheme.bgColorListplayItem}`,
                    }}
                >
                    <div className={style.left}>
                        <div className={style.leftImg}>
                            <img src={songInfo.imgURL || defaultIMG} />

                            <div
                                onClick={() =>
                                    typeListPlay
                                        ? handleChangeSongInPL(songInfo)
                                        : handleChangeSong(songInfo)
                                }
                            >
                                <i className="fa-solid fa-play"></i>
                            </div>
                        </div>
                        <div className={clsx(style.info)}>
                            <h4>{songInfo.songName}</h4>
                            <span className={clsx(style.textSmall)}>
                                {songInfo.singer}
                            </span>
                        </div>
                    </div>
                    <div className={clsx(style.right)}>
                        <div
                            className={clsx(
                                style.rightBtn,
                                mySong.includes(songInfo.id)
                                    ? style.active
                                    : '',
                            )}
                            onClick={() =>
                                handleUpdateUser(songInfo.id, 'updateMySong')
                            }
                        >
                            <i className="fa-solid fa-heart"></i>
                        </div>
                        <div
                            className={clsx(style.rightBtn)}
                            onClick={() =>
                                typeListPlay
                                    ? handleDeleteSongInList(songInfo.id)
                                    : handleUpdateUser(
                                          songInfo.id,
                                          'updateHistoryDelete',
                                      )
                            }
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={clsx(style.wrapper)}>
                    <div className={style.left}>
                        <div className={style.leftImg}>
                            <img src={songInfo.imgURL || defaultIMG} />

                            <div
                                onClick={() =>
                                    typeListPlay
                                        ? handleChangeSongInPL(songInfo)
                                        : handleChangeSong(songInfo)
                                }
                            >
                                <i className="fa-solid fa-play"></i>
                            </div>
                        </div>
                        <div className={clsx(style.info)}>
                            <h4>{songInfo.songName}</h4>
                            <span className={clsx(style.textSmall)}>
                                {songInfo.singer}
                            </span>
                        </div>
                    </div>
                    <div className={clsx(style.right)}>
                        <div
                            className={clsx(
                                style.rightBtn,
                                mySong.includes(songInfo.id)
                                    ? style.active
                                    : '',
                            )}
                            onClick={() =>
                                handleUpdateUser(songInfo.id, 'updateMySong')
                            }
                        >
                            <i className="fa-solid fa-heart"></i>
                        </div>
                        <div
                            className={clsx(style.rightBtn)}
                            onClick={() =>
                                typeListPlay
                                    ? handleDeleteSongInList(songInfo.id)
                                    : handleUpdateUser(
                                          songInfo.id,
                                          'updateHistoryDelete',
                                      )
                            }
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListPlayItem;
