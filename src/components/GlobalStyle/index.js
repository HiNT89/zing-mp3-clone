import { useState, useRef, useEffect, createContext } from 'react';
import logo from '~/assets/imgs/ZingMP3logo.svg.png';
import './style.css';
import NavItem from './components/NavItem';
import clsx from 'clsx';
import style from './GlobalStyle.module.scss';
import { Button, Modal } from 'antd';
import {
    icons,
    iconLibaris,
} from '~/components/GlobalStyle/components/NavItem/icons';
import HeaderContent from './components/HeaderContent';
import { useHref } from 'react-router-dom';
import ListPlay from './components/ListPlay';
import { useDispatch, useSelector } from 'react-redux';
import {
    loginStatus,
    listSongPlay,
    listSong,
    dataUser,
    toast,
    theme,
} from '~/selectors';
import { useNavigate } from 'react-router-dom';
import SongPlay from './components/SongPlay';
import {
    playSong,
    songPlay,
    nextSong,
    playSongInPL,
    prevSong,
    addSongToList,
    deleteSongInList,
    playPlaylist,
    updateSong,
} from './action';
import themes from './theme';
import Toast from '../Toast';
import { logout, updateUser } from '~/containers/Login/action';
function GlobalStyle({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const path = useHref();
    // selector
    const isLogin = useSelector(loginStatus);
    const listPlay = useSelector(listSongPlay);
    const user = useSelector(dataUser);
    const dataListSong = useSelector(listSong);
    const dataToast = useSelector(toast);

    const [dataTheme, setDataTheme] = useState('blue');
    const [typeListPlay, setTypeListPlay] = useState(1); // 1 : danh sach phat , 0 : nghe gan day
    const [listPlayByType, setListPLayByType] = useState([]);
    const [isShowListPlay, setIsShowListPlay] = useState(false);
    const [keywordPlaylist, setKeywordPlaylist] = useState('');
    const [keywordPlaylistUpdate, setKeywordPlaylistUpdate] = useState({
        oldKeyword: '',
        newKeyword: '',
    });
    // modal create playlist
    const [open, setOpen] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    // const [modalText, setModalText] = useState('Content of the modal');
    // effect
    useEffect(() => {
        if (user.setting) {
            const dataTheme = themes.filter(
                (it) => it.nameTheme === user.setting.theme,
            )[0];
            setDataTheme(dataTheme);
        } else {
            const dataTheme = themes.filter((it) => it.nameTheme === 'blue')[0];
            setDataTheme(dataTheme);
        }
    }, [user]);
    useEffect(() => {
        if (!isLogin) navigate('/login');
    }, []);
    useEffect(() => {
        let newList = listPlay;
        if (!typeListPlay) {
            newList = user.history.map((it) => ({
                songInfo: dataListSong.filter((i) => i.id === it)[0],
                type: 'default',
            }));
        }
        setListPLayByType(newList);
    }, [typeListPlay, listPlay]);

    // function
    const toggleModalPlayList = () => {
        setIsShowListPlay(!isShowListPlay);
    };
    // function modal
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async () => {
        // setModalText('The modal will be closed after two seconds');
        // setConfirmLoading(true);
        // setTimeout(() => {
        //     setOpen(false);
        //     setConfirmLoading(false);
        // }, 2000);
        const handleUpdate = () => {
            const confident = !user.playlists.includes(keywordPlaylist);
            let newPlaylists = user.playlists;
            if (confident) {
                newPlaylists = [
                    ...user.playlists,
                    { name: keywordPlaylist, listSong: [] },
                ];
            }
            return newPlaylists;
        };
        const newPlaylists = await handleUpdate();
        const newUser = { ...user, playlists: newPlaylists };
        await dispatch(updateUser(newUser));
        setKeywordPlaylist('');
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const onChangeModal = (e) => {
        setKeywordPlaylist(e.target.value);
    };
    const onChangeModalUpdate = (e) => {
        setKeywordPlaylistUpdate({
            ...keywordPlaylistUpdate,
            newKeyword: e.target.value,
        });
    };
    const handleOkUpdate = async () => {
        // setModalText('The modal will be closed after two seconds');
        // setConfirmLoading(true);
        // setTimeout(() => {
        //     setOpen(false);
        //     setConfirmLoading(false);
        // }, 2000);
        const handleUpdate = () => {
            let newPlaylists = user.playlists;
            const { newKeyword, oldKeyword } = keywordPlaylistUpdate;
            if (newKeyword) {
                newPlaylists = newPlaylists.map((it) =>
                    it.name === oldKeyword ? { ...it, name: newKeyword } : it,
                );
            }
            return newPlaylists;
        };
        const newPlaylists = await handleUpdate();
        const newUser = { ...user, playlists: newPlaylists };
        await dispatch(updateUser(newUser));
        navigate(`/playlist/${keywordPlaylistUpdate.newKeyword}`);
        setKeywordPlaylistUpdate('');
        setOpenModalUpdate(false);
    };
    const handleDeletePlaylist = async (name) => {
        const handleUpdate = () => {
            const newPlaylists = user.playlists.filter(
                (it) => it.name !== name,
            );
            return newPlaylists;
        };
        const newPlaylists = await handleUpdate();
        const newUser = { ...user, playlists: newPlaylists };
        await dispatch(updateUser(newUser));
        navigate(`/libary`);
    };
    // global function
    const handleChangeSong = async (song) => {
        await dispatch(songPlay(song));
        await dispatch(playSong(true));
    };
    const handleNextSong = async (option) => {
        await dispatch(nextSong(option));
        await dispatch(playSong(true));
    };
    const handlePrevSong = async (option) => {
        await dispatch(prevSong(option));
        await dispatch(playSong(true));
    };
    const handleChangeSongInPL = async (it) => {
        await dispatch(playSongInPL(it));
        await dispatch(playSong(true));
    };
    const handleAddSongToList = (arrSongID) => {
        dispatch(addSongToList(arrSongID));
    };
    const handleDeleteSongInList = (id) => {
        dispatch(deleteSongInList(id));
    };
    const handleUpdateUser = async (option, type) => {
        let newUser;
        switch (type) {
            case 'updateMySong':
                {
                    const handleUpdate = () => {
                        const confident = user.mySong.includes(option);
                        let newListSongFavorite;
                        if (confident) {
                            newListSongFavorite = user.mySong.filter(
                                (it) => it !== option,
                            );
                        } else {
                            newListSongFavorite = [...user.mySong, option];
                        }
                        return newListSongFavorite;
                    };
                    const newListSongFavorite = await handleUpdate();
                    newUser = { ...user, mySong: newListSongFavorite };
                }
                break;
            case 'updatePlaylists':
                {
                    const { songID, playlistName } = option;
                    const handleUpdate = () => {
                        const playlist = user.playlists.filter(
                            (it) => it.name === playlistName,
                        )[0];

                        const confident = !playlist.listSong.includes(songID);
                        let newListSong;
                        if (confident) {
                            newListSong = [...playlist.listSong, songID];
                        } else {
                            newListSong = playlist.listSong.filter(
                                (it) => it !== songID,
                            );
                        }
                        return user.playlists.map((it) =>
                            it.name === playlistName
                                ? { ...it, listSong: newListSong }
                                : it,
                        );
                    };
                    const newPlaylists = await handleUpdate();
                    newUser = {
                        ...user,
                        playlists: newPlaylists,
                    };
                }
                break;
            case 'deleteSongPlaylists':
                {
                    console.log(option.arrID);
                    const { arrID, playlistName } = option;

                    const handleUpdate = () => {
                        const playlist = user.playlists.filter(
                            (it) => it.name === playlistName,
                        )[0];

                        let newListSong = playlist.listSong.filter(
                            (it) => !arrID.includes(it),
                        );
                        console.log(newListSong);
                        return user.playlists.map((it) =>
                            it.name === playlistName
                                ? { ...it, listSong: newListSong }
                                : it,
                        );
                    };
                    const newPlaylists = await handleUpdate();
                    newUser = {
                        ...user,
                        playlists: newPlaylists,
                    };
                }
                break;
            case 'updateHistory':
                {
                    const handleUpdate = () => {
                        const newArr = user.history.filter(
                            (it) => it !== option,
                        );
                        return [option, ...newArr];
                    };
                    const newHistory = await handleUpdate();
                    newUser = {
                        ...user,
                        history: newHistory,
                    };
                }
                break;
            case 'updateHistoryDelete':
                {
                    const handleUpdate = () => {
                        const newArr = user.history.filter(
                            (it) => it !== option,
                        );
                        return newArr;
                    };
                    const newHistory = await handleUpdate();
                    newUser = {
                        ...user,
                        history: newHistory,
                    };
                }
                break;
            case 'updateTheme':
                {
                    const newSetting = { ...user.setting, theme: option };
                    newUser = {
                        ...user,
                        setting: newSetting,
                    };
                }
                break;
            default: {
            }
        }
        await dispatch(updateUser(newUser));
    };
    const handleLogout = async () => {
        navigate('/login');
        await dispatch(logout());
    };
    const handleUpdatePlaylistModal = (name) => {
        if (!openModalUpdate)
            setKeywordPlaylistUpdate({
                newKeyword: name,
                oldKeyword: name,
            });
        setOpenModalUpdate(!openModalUpdate);
    };
    const handlePlayPlaylist = async (arr) => {
        await dispatch(playPlaylist(arr));
        await dispatch(playSong(true));
    };
    const handleUpdateSong = async (type, option) => {
        let newSong = option;
        switch (type) {
            case 'updateCount':
                {
                    newSong = { ...newSong, count: newSong.count++ };
                }
                break;
            default: {
            }
        }
        await dispatch(updateSong(newSong));
    };
    // -------------
    const newChildren = (
        <Global.Provider
            value={{
                handleChangeSong,
                handleChangeSongInPL,
                handleAddSongToList,
                handleUpdateUser,
                handleToggleCreatePlaylistModal: () => {
                    setOpen(!open);
                },
                handleUpdatePlaylistModal,
                handleDeletePlaylist,
                handlePlayPlaylist,
                dataTheme: dataTheme,
            }}
        >
            {children}
        </Global.Provider>
    );
    return (
        <div
            className={clsx(style.wrapper)}
            style={{ backgroundColor: `${dataTheme.bgColor}` }}
        >
            <Toast dataToast={dataToast} />
            {/* navbar */}
            <div
                className={clsx(style.slider)}
                style={{ backgroundColor: `${dataTheme.bgColorNav}` }}
            >
                <div className={clsx(style.slider_logo)}>
                    <img width={'120px'} height={'40px'} src={logo} />
                </div>
                <div className={clsx(style.slider_nav)}>
                    <div className={clsx(style.slider_nav_top)}>
                        {icons.slice(0, 5).map((it) => (
                            <NavItem
                                key={it.id}
                                title={it.title}
                                children={it.icon}
                                isActive={path === it.path}
                                path={it.path}
                            />
                        ))}
                        <div className={clsx(style.slider_nav_line)}></div>
                    </div>
                    <div className={clsx(style.slider_nav_bottom)}>
                        {icons.slice(5).map((it) => (
                            <NavItem
                                key={it.id}
                                title={it.title}
                                children={it.icon}
                                isActive={it.isActive}
                                path={it.path}
                            />
                        ))}
                        <h4>thư viện</h4>
                        {iconLibaris.map((it) => (
                            <NavItem
                                key={it.id}
                                title={it.title}
                                children={it.icon}
                                isActive={it.isActive}
                            />
                        ))}
                    </div>
                </div>
                <Button
                    className={clsx(style.slider_btn_add)}
                    ghost
                    onClick={showModal}
                >
                    <i className="fa-solid fa-plus"></i>Tạo playlist mới
                </Button>
            </div>
            {/* content */}
            <div className={clsx(style.content)}>
                {/* header content */}
                <HeaderContent
                    handleChangeSong={handleChangeSong}
                    handleAddSongToList={handleAddSongToList}
                    isMale={user.sex === 'male' || false}
                    handleLogout={handleLogout}
                    handleUpdateUser={handleUpdateUser}
                    dataTheme={dataTheme}
                />
                {/* content */}
                <div className={clsx(style.content_center)}>
                    {/* page */}
                    {newChildren}
                </div>
                {/* list play */}
                <div
                    className={clsx(
                        style.listPlay_wrapper,
                        isShowListPlay ? style.active : style.notActive,
                    )}
                    style={{ backgroundColor: `${dataTheme.bgColorListplay}` }}
                >
                    <div className={clsx(style.listPlay_top)}>
                        <div className={clsx(style.listPlay_topWrapper)}>
                            <div
                                className={clsx(
                                    style.listPlay_top_item,
                                    typeListPlay ? style.active : '',
                                )}
                                onClick={() => setTypeListPlay(1)}
                            >
                                danh sách phát
                            </div>
                            <div
                                className={clsx(
                                    style.listPlay_top_item,
                                    !typeListPlay ? style.active : '',
                                )}
                                onClick={() => setTypeListPlay(0)}
                            >
                                phát gần đây
                            </div>
                        </div>
                    </div>
                    <div className={clsx(style.listPlay_list)}>
                        <ListPlay
                            listPlay={listPlayByType || []}
                            handleChangeSongInPL={handleChangeSongInPL}
                            handleDeleteSongInList={handleDeleteSongInList}
                            handleUpdateUser={handleUpdateUser}
                            typeListPlay={typeListPlay}
                            handleChangeSong={handleChangeSong}
                            dataTheme={dataTheme}
                        />
                    </div>
                </div>
            </div>
            {/* song */}
            <SongPlay
                toggleModalPlayList={toggleModalPlayList}
                handleChangeSong={handleChangeSong}
                handleNextSong={handleNextSong}
                handlePrevSong={handlePrevSong}
                handleUpdateUser={handleUpdateUser}
                handleUpdateSong={handleUpdateSong}
                dataTheme={dataTheme}
            />
            {/* modal create playlist */}
            <Modal
                // title="Tạo playlist mới"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                className={clsx(style.modal_wrapper)}
                style={{
                    backgroundColor: `${dataTheme.bgModal}`,
                    borderRadius: '8px',
                    // '& .ant-btn-primary': {
                    //     backgroundColor: `${dataTheme.bgModal} !important`,
                    // },
                }}
                okText="Xác nhận"
                cancelText="Hủy"
                okButtonProps={{
                    style: {
                        backgroundColor: `${dataTheme.bgColorBtn}`,
                    },
                }}
            >
                <h3 className={clsx(style.modal_title)}>Tạo playlist mới</h3>
                <input
                    type="text"
                    value={keywordPlaylist}
                    placeholder="Nhập tên playlist"
                    onChange={(e) => onChangeModal(e)}
                />

                {/* <div className={clsx(style.modal_option)}>
                    <div>
                        <h4 className={clsx(style.modal_option_title)}>
                            Phát ngẫu nhiên
                        </h4>
                        <span className={clsx(style.modal_option_note)}>
                            Luôn phát ngẫu nhiên tất cả bài hát
                        </span>
                    </div>
                    <div
                        className={clsx(
                            style.modal_option_btn,
                            listOptionModal.random ? style.active : '',
                        )}
                        onClick={() =>
                            setListOptionModal({
                                ...listOptionModal,
                                random: !listOptionModal.random,
                            })
                        }
                    >
                        <span></span>
                    </div>
                </div>
                <div className={clsx(style.modal_option)}>
                    <div>
                        <h4 className={clsx(style.modal_option_title)}>
                            Lặp lại
                        </h4>
                        <span className={clsx(style.modal_option_note)}>
                            Luôn Lặp lại tất cả bài hát
                        </span>
                    </div>
                    <div
                        className={clsx(
                            style.modal_option_btn,
                            listOptionModal.repeat ? style.active : '',
                        )}
                        onClick={() =>
                            setListOptionModal({
                                ...listOptionModal,
                                repeat: !listOptionModal.repeat,
                            })
                        }
                    >
                        <span></span>
                    </div>
                </div> */}
            </Modal>
            <Modal
                // title="Tạo playlist mới"
                open={openModalUpdate}
                onOk={handleOkUpdate}
                confirmLoading={confirmLoading}
                onCancel={() => setOpenModalUpdate(false)}
                className={clsx(style.modal_wrapper)}
            >
                <div>
                    <h3 className={clsx(style.modal_title)}>
                        Chỉnh sửa playlist
                    </h3>
                    <input
                        type="text"
                        value={keywordPlaylistUpdate.newKeyword}
                        placeholder="Nhập tên playlist"
                        onChange={(e) => onChangeModalUpdate(e)}
                    />
                </div>
            </Modal>
        </div>
    );
}
export const Global = createContext();
export default GlobalStyle;
