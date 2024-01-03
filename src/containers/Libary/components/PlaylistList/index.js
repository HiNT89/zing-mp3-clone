import clsx from 'clsx';
import PlaylistItem from '../PlaylistItem';
import defaultIMG from '~/assets/imgs/default.webp';
import style from './PlaylistList.module.scss';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { listSong } from '~/selectors';
import { Global } from '~/components/GlobalStyle';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
function Playlist({ playlist }) {
    const dataListSong = useSelector(listSong);
    const { handleToggleCreatePlaylistModal } = useContext(Global);
    const navigate = useNavigate();
    return (
        <div className={clsx(style.wrapper)}>
            <div className={clsx(style.top)}>
                <div>
                    <h2 className={clsx(style.title)}>playlist</h2>
                    <Button
                        onClick={handleToggleCreatePlaylistModal}
                        styles={{
                            svg: {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </Button>
                </div>
                <Button
                    onClick={() => {
                        navigate('/playlist');
                    }}
                >
                    tất cả <i className="fa-solid fa-chevron-right"></i>
                </Button>
            </div>
            <div className={clsx(style.list)}>
                {playlist.map((it, index) => {
                    let thumb = defaultIMG;
                    if (it.listSong.length) {
                        const itemSong = dataListSong.filter(
                            (item) => item.id === it.listSong[0],
                        )[0];
                        thumb = itemSong.imgURL;
                    }
                    return (
                        <PlaylistItem
                            key={index}
                            dataPlaylist={{
                                src: thumb,
                                playlistName: it.name,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Playlist;
