import style from './ResultSearch.module.scss';
import clsx from 'clsx';
import defaultIMG from '~/assets/imgs/default.webp';
import { Button, Spin } from 'antd';
import { dataUser } from '~/selectors';
import { Global } from '~/components/GlobalStyle';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import ButtonAddToPlaylist from '~/components/ButtonAddToPlaylist';

function ResultSearch({
    handleChangeSong,
    handleAddSongToList,
    handleUpdateUser,
    listResult,
    isEmtySearch,
    isLoading,
    dataTheme,
}) {
    // const {
    //     handleChangeSong,
    //     handleChangeSong,
    //     handleUpdateUser,
    //     dataTheme,
    // } = useContext(Global);
    const { mySong ,playlists} = useSelector(dataUser);
    if (isLoading)
        return (
            <div className={clsx(style.wrapper)}>
                <Spin size="large" />
            </div>
        );
    if (isEmtySearch)
        return (
            <div className={clsx(style.wrapper)}>
                <h3 className={clsx(style.emty_title)}>
                    không tìm thấy bài hát
                </h3>
            </div>
        );

    return (
        <div className={clsx(style.list)}>
            {listResult.map((it, index) => (
                <div key={index} className={clsx(style.newSongCategory_item)}>
                    <img src={it.imgURL || defaultIMG} alt="img" />
                    <div className={clsx(style.newSongCategory_item_info)}>
                        <b>{it.songName}</b>
                        <span>{it.singer}</span>
                    </div>
                    <div className={clsx(style.newSongCategory_item_before)}>
                        <Button
                            className={clsx(style.newSongCategory_item_btn)}
                            onClick={() => handleChangeSong(it)}
                        >
                            <i className="fa-solid fa-play"></i>
                        </Button>
                        <div className={clsx(style.right)}>
                            {mySong.includes(it.id) ? (
                                <div
                                    className={clsx(
                                        style.rightBtn,
                                        style.active,
                                    )}
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
                                </div>
                            ) : (
                                <div
                                    className={clsx(style.rightBtn)}
                                    onClick={() =>
                                        handleUpdateUser(
                                            it.id,
                                            'updateMySong',
                                        )
                                    }
                                >
                                    <i className="fa-solid fa-heart"></i>
                                </div>
                            )}
                            <ButtonAddToPlaylist
                                listPlaylist={playlists}
                                handleAddSongToList={handleAddSongToList}
                                song={it}
                                handleUpdateUser={handleUpdateUser}
                                isItemLastRow={true}
                                dataTheme={dataTheme}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ResultSearch;
