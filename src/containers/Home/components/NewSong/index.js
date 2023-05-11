import style from './NewSong.module.scss';
import { Button } from 'antd';
import defaultIMG from '~/assets/imgs/default.webp';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
function NewSong({ listData, handleChangeSong, dataTheme }) {
    return (
        <div className={clsx(style.NewSong)}>
            <div className={clsx(style.NewSong_top)}>
                <h3>Nhạc mới</h3>
                <Link to="new-song">
                    tất cả <i className="fa-solid fa-chevron-right"></i>
                </Link>
            </div>
            <div className={clsx(style.NewSong_bottom)}>
                {listData.map((it, index) => (
                    <div
                        key={it.id}
                        className={clsx(style.NewSong_bottom_item)}
                        // style={{
                        //     backgroundColor: `${dataTheme.bgColorNewSong}`,
                        // }}
                    >
                        <div className={clsx(style.NewSong_bottom_img)}>
                            <img src={it.imgURL || defaultIMG} />
                            <div>
                                <Button
                                    className={clsx(style.NewSong_bottom_btn)}
                                    onClick={() => {
                                        handleChangeSong(it);
                                    }}
                                >
                                    <i className="fa-solid fa-play"></i>
                                </Button>
                            </div>
                        </div>
                        <div className={clsx(style.NewSong_bottom_info)}>
                            <div
                                className={clsx(style.NewSong_bottom_info_top)}
                            >
                                <h3>{it.songName}</h3>
                                <span>{it.singer}</span>
                            </div>
                            <div
                                className={clsx(
                                    style.NewSong_bottom_info_bottom,
                                )}
                            >
                                <h2> {`#${index + 1}`}</h2>
                                <span>{it.releaseDate}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewSong;
