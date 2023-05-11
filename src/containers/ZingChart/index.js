import clsx from 'clsx';
import styles from './ZingChart.module.scss';
import { Button } from 'antd';
import Item from './components/Item';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { listSong } from '~/selectors';
import { useContext } from 'react';
import { Global } from '~/components/GlobalStyle';
function ZingChart() {
    const [arr, setArr] = useState([]);
    const [isShowBtn, setIsShowBtn] = useState(true);
    const dataListSong = useSelector(listSong);
    const showAll = () => {
        const newArr = dataListSong.sort((a, b) => b.count - a.count);
        setArr(newArr);
        setIsShowBtn(false);
    };
    useEffect(() => {
        const newArr = dataListSong
            .sort((a, b) => {
                return b.count - a.count;
            })
            .slice(0, 10);
        setArr(newArr);
    }, []);
    return (
        <div className={clsx(styles.wrapper)}>
            <h1>#ZingChart</h1>
           
            <div className={clsx(styles.content)}>
                <div className={clsx(styles.list)}>
                    {arr.map((it, index) => {
                        let color = 'white';
                        if (index === 0) color = 'blue';
                        if (index === 1) color = 'green';
                        if (index === 2) color = 'red';
                        return (
                            <Item
                                index={index + 1}
                                data={it}
                                key={it.id}
                                color={color}
                            />
                        );
                    })}
                </div>
                {isShowBtn ? (
                    <Button className={clsx(styles.btn)} onClick={showAll}>
                        xem top 100
                    </Button>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

export default ZingChart;
