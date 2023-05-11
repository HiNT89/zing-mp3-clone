import clsx from 'clsx';
import styles from './ButtonAddToPlaylist.module.scss';
import { Button } from 'antd';
function ButtonAddToPlaylist({
    listPlaylist,
    handleAddSongToList,
    song,
    handleUpdateUser,
    isItemLastRow,
    dataTheme,
}) {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.iconAdd)}>
                <i className="fa-solid fa-circle-plus"></i>
                <div
                    className={clsx(
                        styles.list_BtnAdd,
                        isItemLastRow ? styles.list_BtnAdd_right : '',
                    )}
                    style={{ backgroundColor: `${dataTheme.bgSearchResult}` }}
                >
                    <Button onClick={() => handleAddSongToList([song.id])}>
                        <i className="fa-solid fa-list-ul"></i>
                        add to list play
                    </Button>
                    {listPlaylist.map((it, index) => (
                        <Button
                            onClick={() =>
                                handleUpdateUser(
                                    { songID: song.id, playlistName: it.name },
                                    'updatePlaylists',
                                )
                            }
                            key={index}
                        >
                            <i className="fa-solid fa-record-vinyl"></i>
                            add to {it.name}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ButtonAddToPlaylist;
