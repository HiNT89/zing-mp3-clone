import style from './Singers.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
function Singers({ listSingers }) {
    return (
        <div className={clsx(style.Singers)}>
            {listSingers.map((it, index) => (
                <Link key={index} to={`/singer/${it.singer}`}>
                    <img src={it.url} />
                </Link>
            ))}
        </div>
    );
}

export default Singers;
