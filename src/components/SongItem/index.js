import clsx from 'clsx';
import style from './SongItem.module.scss';
import defaultIMG from '~/assets/imgs/default.webp';
import { Global } from '~/components/GlobalStyle';
import { useContext } from 'react';
import ButtonAddToPlaylist from '~/components/ButtonAddToPlaylist';
import { dataUser } from '~/selectors';
import { useSelector } from 'react-redux';
function SongItem(props) {
    const {
        data,
        onClick,
        handleChangeSong,
        handleAddSongToList,
        handleUpdateUser,
        dataTheme,
    } = props;
    let { isChecked, song, isActive } = data;
    const { playlists } = useSelector(dataUser);
    if(!song) {
        song =  {
            "songName": "ai rồi cũng sẽ khác",
            "singer": "hà nhi",
            "imgURL": "https://firebasestorage.googleapis.com/v0/b/music-app-d9617.appspot.com/o/imgs%2FAiRoiCungKhac.webp?alt=media&token=b1978195-e729-4b76-9dc9-f7bb9a144809",
            "audioURL": "https://firebasestorage.googleapis.com/v0/b/music-app-d9617.appspot.com/o/songs%2FAiRoiCungSeKhac_0446.mp3?alt=media&token=6959b1c5-cee0-4873-aa8c-18ee1f6747a8",
            "album": "Giao Lộ Thời Gian Tập 8",
            "songID": "821dda93-2c96-4208-8051-7b496e3819f5",
            "releaseDate": "2023-01-21",
            "type": "Việt Nam, V-Pop",
            "count": 500,
            "id": "1"
        }
    }
    return (
        <div className={clsx(style.wrapper, isChecked ? style.active : '')}>
            <div className={style.left}>
                <div className={style.leftFirst}>
                    <i className="fa-solid fa-music"></i>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onClick(song.id)}
                    />
                </div>

                <div className={style.leftImg}>
                    <img src={song.imgURL || defaultIMG} />
                    <div onClick={() => handleChangeSong(song)}>
                        <i className="fa-solid fa-play"></i>
                    </div>
                </div>
                <div className={clsx(style.info)}>
                    <h4>{song.songName}</h4>
                    <span className={clsx(style.textSmall)}>{song.singer}</span>
                </div>
            </div>
            <div className={clsx(style.center)}>
                <span className={clsx(style.textSmall)}>{song.album}</span>
            </div>
            <div className={clsx(style.right)}>
                {isActive ? (
                    <div
                        className={clsx(style.rightBtn, style.active)}
                        onClick={() =>
                            handleUpdateUser(song.id, 'updateMySong')
                        }
                        style={{
                            color: `${dataTheme.bgColorBtn}`,
                        }}
                    >
                        <i className="fa-solid fa-heart"></i>
                    </div>
                ) : (
                    <div
                        className={clsx(style.rightBtn)}
                        onClick={() =>
                            handleUpdateUser(song.id, 'updateMySong')
                        }
                    >
                        <i className="fa-solid fa-heart"></i>
                    </div>
                )}
                <ButtonAddToPlaylist
                    listPlaylist={playlists}
                    handleAddSongToList={handleAddSongToList}
                    song={song}
                    handleUpdateUser={handleUpdateUser}
                    isItemLastRow={true}
                    dataTheme={dataTheme}
                />
            </div>
        </div>
    );
}

export default SongItem;
