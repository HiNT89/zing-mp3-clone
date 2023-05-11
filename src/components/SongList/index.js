import clsx from 'clsx';
import style from './SongList.module.scss';
import SongItem from '~/components/SongItem';
import { useEffect, useState, useContext } from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { dataUser, listSong } from '~/selectors';
import { Global } from '~/components/GlobalStyle';
function SongList({ listSongLibary, title }) {
    const [listChecked, setListChecked] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const dataListSong = useSelector(listSong);
    const { mySong } = useSelector(dataUser);
    const {
        handleChangeSong,
        handleAddSongToList,
        handleUpdateUser,
        dataTheme,
    } = useContext(Global);
    const handleOnCheck = (id) => {
        const condition = listChecked.includes(id);
        if (condition) {
            setListChecked(listChecked.filter((it) => it !== id));
        } else {
            setListChecked([...listChecked, id]);
        }
    };
    useEffect(() => {
        const newListChecked = checkAll ? listSongLibary.map((it) => it) : [];
        setListChecked(newListChecked);
    }, [checkAll]);
    const handleAddListSongToList = async () => {
        await handleAddSongToList(listChecked);
        setListChecked([]);
        setCheckAll(false);
    };
    if (!listSongLibary.length)
        return (
            <div className={clsx(style.wrapper)}>
                <h2>{title}</h2>
                <div>
                    {listChecked.length ? (
                        <div className={clsx(style.checkAll)}>
                            <input
                                type="checkbox"
                                checked={checkAll}
                                onChange={() => setCheckAll(!checkAll)}
                            />
                            <Button onClick={handleAddListSongToList}>
                                thêm vào danh sách phát
                            </Button>
                        </div>
                    ) : (
                        <span>bài hát</span>
                    )}

                    <span>album</span>
                    <span></span>
                </div>
                <div className={clsx(style.emty_box)}>
                    <h3 className={clsx(style.emty)}>chưa có bài hát</h3>
                </div>
            </div>
        );

    return (
        <div className={clsx(style.wrapper)}>
            <h2>{title}</h2>
            <div>
                {listChecked.length ? (
                    <div className={clsx(style.checkAll)}>
                        <input
                            type="checkbox"
                            checked={checkAll}
                            onChange={() => setCheckAll(!checkAll)}
                        />
                        <Button onClick={handleAddListSongToList}>
                            thêm vào danh sách phát
                        </Button>
                    </div>
                ) : (
                    <span>bài hát</span>
                )}

                <span>album</span>
                <span></span>
            </div>
            {listSongLibary.map((it) => {
                const itemSong = dataListSong.filter(
                    (item) => item.id === it,
                )[0];
                return (
                    <SongItem
                        key={it}
                        data={{
                            isChecked: listChecked.includes(it),
                            song: itemSong,
                            isActive: mySong.includes(it),
                        }}
                        onClick={handleOnCheck}
                        handleChangeSong={handleChangeSong}
                        handleAddSongToList={handleAddSongToList}
                        handleUpdateUser={handleUpdateUser}
                        dataTheme={dataTheme}
                    />
                );
            })}
        </div>
    );
}

export default SongList;
