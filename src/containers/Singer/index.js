import clsx from 'clsx';
import style from './Singer.module.scss';
import { dataSinger } from './dataSinger';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { listSong } from '~/selectors';
import { Button } from 'antd';
import { Global } from '~/components/GlobalStyle';
function Singer() {
    const { handlePlayPlaylist, handleChangeSong } = useContext(Global);
    let { singer } = useParams();
    const [singerInfo, setSingerInfo] = useState({});
    const [listSongBySinger, setListSongBySinger] = useState([]);
    const listSongData = useSelector(listSong);
    useEffect(() => {
        handleListSongBySinger(5);
    }, []);
    const handleListSongBySinger = (numberItem) => {
        const singerItem = dataSinger.filter((it) => it.name === singer);
        setSingerInfo(singerItem[0]);
        const listSong = listSongData
            .filter((it) =>
                it.singer.toLowerCase().includes(singerItem[0].singer),
            )
            .slice(0, numberItem);
        setListSongBySinger(listSong);
    };

    const widthItem = `calc((100% / 2) - 15px )`;
    return (
        <div className={clsx(style.wrapper_singer)}>
            <div className={clsx(style.top)}>
                <img src={singerInfo.bgURL} />
                <div className={clsx(style.top_content)}>
                    <h1>{singerInfo.singer}</h1>
                    <Button
                        onClick={() =>
                            handlePlayPlaylist(
                                listSongBySinger.map((it) => it.id),
                            )
                        }
                    >
                        <i className="fa-solid fa-circle-play"></i>
                    </Button>
                </div>
            </div>
            <div className={clsx(style.center)}>
                <div className={clsx(style.center_top)}>
                    <h3 className={clsx(style.center_top_title)}>bài hát</h3>
                    <Button
                        className={clsx(style.center_top_btn)}
                        onClick={() =>
                            handleListSongBySinger(listSongData.length - 1)
                        }
                    >
                        tất cả <i className="fa-solid fa-chevron-right"></i>
                    </Button>
                </div>

                <div className={clsx(style.list)}>
                    {listSongBySinger.map((it) => (
                        <div
                            key={it.id}
                            className={clsx(style.item)}
                            style={{ width: `${widthItem}` }}
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
                                <Button className={clsx(style.item_btn)}>
                                    <i className="fa-solid fa-ellipsis"></i>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Singer;
