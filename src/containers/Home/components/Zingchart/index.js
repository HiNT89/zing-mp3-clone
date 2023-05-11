import clsx from 'clsx';
import styles from './Zingchart.module.scss';
import { Button } from 'antd';
import defaultIMG from '~/assets/imgs/default.webp';
import { useEffect, useState } from 'react';
// import chart from './chart';
import { listSong } from '~/selectors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { transformNumber } from '~/function';

function Zingchart({ dataTheme, handleChangeSong }) {
    const [arr, setArr] = useState([]);
    const dataListSong = useSelector(listSong);
    const [itemDemo, setItemDemo] = useState({ data: '', index: '' });
    useEffect(() => {
        let index = 0;
        const newArr = dataListSong
            .sort((a, b) => {
                return b.count - a.count;
            })
            .slice(0, 3);
        setArr(newArr);
        setItemDemo({ data: newArr[index], index: index });
        setInterval(() => {
            setItemDemo({ data: newArr[index], index: index });
            index < 2 ? index++ : (index = 0);
        }, 10000);
    }, []);
    const navigate = useNavigate();
    return (
        <div
            className={clsx(styles.wrapper)}
            style={{ backgroundImage: `${dataTheme.bgZingchart}` }}
        >
            <h2 className={clsx(styles.title)}>
                <span> #zingchart</span>
                <Button className={clsx(styles.title_btn)}>
                    <i className="fa-solid fa-circle-play"></i>
                </Button>
            </h2>
            <div className={clsx(styles.content)}>
                <div className={clsx(styles.bxh)}>
                    {arr.map((it, index) => (
                        <div
                            key={it.id}
                            className={clsx(
                                styles.bxh_item,
                                itemDemo.data.id === it.id ? styles.active : '',
                            )}
                        >
                            <span className={clsx(styles.bxh_item_stt)}>
                                {index + 1}
                            </span>
                            <div className={clsx(styles.bxh_item_data)}>
                                <div className={clsx(styles.bxh_item_img)}>
                                    <img src={it.imgURL || defaultIMG} />
                                    <Button
                                        className={clsx(
                                            styles.bxh_item_img_btn,
                                        )}
                                        onClick={() => handleChangeSong(it)}
                                    >
                                        <i className="fa-solid fa-play"></i>
                                    </Button>
                                </div>
                                <div className={clsx(styles.bxh_item_info)}>
                                    <h4>{it.songName}</h4>
                                    <span>{it.singer}</span>
                                </div>
                            </div>
                            <div className={clsx(styles.bxh_item_count)}>
                                <span>{transformNumber(it.count)}</span>
                                <i className="fa-solid fa-headphones"></i>
                            </div>
                        </div>
                    ))}
                    <Button
                        className={clsx(styles.bxh_btn)}
                        onClick={() => navigate('/zingchart')}
                    >
                        xem thêm
                    </Button>
                </div>
                <div className={clsx(styles.demo)}>
                    <div className={clsx(styles.demo_top)}>
                        <span className={clsx(styles.bxh_item_stt)}>
                            {itemDemo.index + 1}
                        </span>
                        <img src={itemDemo.data.imgURL || defaultIMG} />
                    </div>

                    <table>
                        <tr>
                            <th>bài hát :</th>
                            <td>{itemDemo.data.songName}</td>
                        </tr>
                        <tr>
                            <th>ca sĩ :</th>
                            <td>{itemDemo.data.singer}</td>
                        </tr>
                        <tr>
                            <th>album :</th>
                            <td>{itemDemo.data.album}</td>
                        </tr>
                        <tr>
                            <th>thể loại :</th>
                            <td>{itemDemo.data.type}</td>
                        </tr>
                        <tr>
                            <th>ngày phát hành :</th>
                            <td>{itemDemo.data.releaseDate}</td>
                        </tr>
                        <tr>
                            <th>lượt nghe :</th>
                            <td>{transformNumber(itemDemo.data.count)}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Zingchart;
