import clsx from 'clsx';
import styles from './Item.module.scss';
import defaultIMG from '~/assets/imgs/default.webp';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { dataUser } from '~/selectors';
import { useContext } from 'react';
import { Global } from '~/components/GlobalStyle';
import { transformNumber } from '~/function';
function Item({ data, color, index }) {
    const { mySong } = useSelector(dataUser);
    const {
        handleChangeSong,
        handleAddSongToList,
        handleUpdateUser,
        dataTheme,
    } = useContext(Global);

    return (
        <div className={clsx(styles.wrapper)}>
            <span
                style={{ WebkitTextStroke: `1px ${color}` }}
                className={clsx(styles.bxh_item_stt)}
            >
                {index}
            </span>
            <div className={clsx(styles.bxh_item_brick)}>
                <i className="fa-regular fa-window-minimize"></i>
            </div>
            <div className={clsx(styles.bxh_item_data)}>
                <div className={clsx(styles.bxh_item_img)}>
                    <img src={data.imgURL || defaultIMG} />
                    <Button
                        className={clsx(styles.bxh_item_img_btn)}
                        onClick={() => handleChangeSong(data)}
                    >
                        <i className="fa-solid fa-play"></i>
                    </Button>
                </div>
                <div className={clsx(styles.bxh_item_info)}>
                    <h4>{data.songName}</h4>
                    <span>{data.singer}</span>
                </div>
            </div>
            <div className={clsx(styles.bxh_item_album)}>{data.album}</div>
            <div className={clsx(styles.bxh_item_count)}>
                {mySong.includes(data.id) ? (
                    <span
                        className={clsx(styles.bxh_item_heart_active)}
                        onClick={() => handleUpdateUser(it.id, 'updateMySong')}
                        style={{
                            color: `${dataTheme.bgColorBtn}`,
                        }}
                    >
                        <i className="fa-solid fa-heart"></i>
                    </span>
                ) : (
                    <span
                        className={clsx(styles.bxh_item_heart)}
                        onClick={() => handleUpdateUser(it.id, 'updateMySong')}
                    >
                        <i className="fa-solid fa-heart"></i>
                    </span>
                )}
                <span>{transformNumber(data.count)}</span>
                <i className="fa-solid fa-headphones"></i>
            </div>
        </div>
    );
}

export default Item;
