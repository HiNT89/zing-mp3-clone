import style from './Suggest.module.scss';
import clsx from 'clsx';
import { Typography, Button } from 'antd';
import styled from 'styled-components';
import { dataUser } from '~/selectors';
import { useSelector } from 'react-redux';
import defaultIMG from '~/assets/imgs/default.webp';
let { Title } = Typography;
Title = styled.h3`
    color: #fff;
    text-transform: capitalize;
`;
function Suggest({ listData, handleChangeSong, handleUpdateUser, dataTheme }) {
    const user = useSelector(dataUser);
    return (
        <div className={clsx(style.wrapper)}>
            <Title level={3}>Gợi ý cho bạn</Title>
            <div className={clsx(style.list)}>
                {listData.map((it, index) => {
                    if (!it) {
                        it = {
                            songName: 'ai rồi cũng sẽ khác',
                            singer: 'hà nhi',
                            imgURL: 'https://firebasestorage.googleapis.com/v0/b/music-app-d9617.appspot.com/o/imgs%2FAiRoiCungKhac.webp?alt=media&token=b1978195-e729-4b76-9dc9-f7bb9a144809',
                            audioURL:
                                'https://firebasestorage.googleapis.com/v0/b/music-app-d9617.appspot.com/o/songs%2FAiRoiCungSeKhac_0446.mp3?alt=media&token=6959b1c5-cee0-4873-aa8c-18ee1f6747a8',
                            album: 'Giao Lộ Thời Gian Tập 8',
                            songID: '821dda93-2c96-4208-8051-7b496e3819f5',
                            releaseDate: '2023-01-21',
                            type: 'Việt Nam, V-Pop',
                            count: 500,
                            id: '1',
                        };
                    }
                    return (
                        <div key={index} className={clsx(style.item)}>
                            <div className={clsx(style.item_img)}>
                                <img src={it.imgURL || defaultIMG} />
                                <div className={clsx(style.item_img_before)}>
                                    {user.mySong.includes(it.id) ? (
                                        <Button
                                            className={clsx(style.btn)}
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
                                            className={clsx(style.btn)}
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

                                    <Button
                                        className={clsx(style.btn)}
                                        onClick={() => handleChangeSong(it)}
                                    >
                                        <i className="fa-solid fa-play"></i>
                                    </Button>
                                </div>
                            </div>
                            <div className={clsx(style.item_text)}>
                                <h4>{it.songName}</h4>
                                <span>{it.singer}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Suggest;
