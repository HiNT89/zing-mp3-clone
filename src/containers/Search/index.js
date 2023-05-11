import { Button } from 'antd';
import clsx from 'clsx';
import style from './Search.module.scss';
import ckp from '~/assets/imgs/ckp.webp';
import { useParams } from 'react-router-dom';
function Search() {
    const { keyword } = useParams();
    console.log(keyword);
    const listData = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <div className={clsx(style.wrapper)}>
            <h1>kết quả tìm kiếm</h1>
            <h2>bài hát</h2>
            <div className={clsx(style.result)}>
                {listData.map((it, index) => (
                    <div className={clsx(style.wrapper_item)} key={index}>
                        <div className={style.left}>
                            <div className={style.leftImg}>
                                <img src={ckp} />
                                <div>
                                    <i className="fa-solid fa-play"></i>
                                </div>
                            </div>
                            <div className={clsx(style.info)}>
                                <h4>em la ke dang thuong</h4>
                                <span className={clsx(style.textSmall)}>
                                    phat huy t4
                                </span>
                            </div>
                        </div>
                        <div className={clsx(style.center)}>
                            <span className={clsx(style.textSmall)}>
                                em la ke dang thuong (single)
                            </span>
                        </div>
                        <div className={clsx(style.right)}>
                            <div className={clsx(style.rightBtn, style.active)}>
                                <i className="fa-solid fa-heart"></i>
                            </div>
                            <div className={clsx(style.rightBtn_add)}>
                                <i className="fa-solid fa-circle-plus"></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;
