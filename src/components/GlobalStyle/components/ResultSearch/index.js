import style from './ResultSearch.module.scss';
import clsx from 'clsx';
import defaultIMG from '~/assets/imgs/default.webp';

import { Button, Spin } from 'antd';

function ResultSearch({
    listResult,
    handleChangeSong,
    handleAddSongToList,
    isEmtySearch,
    isLoading,
}) {
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
                        <Button
                            className={clsx(
                                style.newSongCategory_item_btn,
                                it.isLibary ? style.active : '',
                            )}
                        >
                            <i className="fa-solid fa-heart"></i>
                        </Button>
                        <Button
                            className={clsx(style.newSongCategory_item_btn)}
                            onClick={() => handleAddSongToList(it)}
                        >
                            <i className="fa-solid fa-circle-plus"></i>
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ResultSearch;
