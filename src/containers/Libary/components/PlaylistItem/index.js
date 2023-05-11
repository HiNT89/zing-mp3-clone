import clsx from 'clsx';
import style from './PlaylistItem.module.scss';
import { Link } from 'react-router-dom';
function PlaylistItem(props) {
    const { src, playlistName } = props.dataPlaylist;
    return (
        <Link to={`/playlist/${playlistName}`} className={clsx(style.wrapper)}>
            <div className={clsx(style.thumb)}>
                <img src={src} />
            </div>
            <span>{playlistName}</span>
        </Link>
    );
}

export default PlaylistItem;
