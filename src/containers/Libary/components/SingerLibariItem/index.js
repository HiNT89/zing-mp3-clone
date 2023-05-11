import clsx from 'clsx';
import style from './SingerLibariItem.module.scss';
import { Link } from 'react-router-dom';
function SingerLibariItem({ path, imgURL, isBtn }) {
    return (
        <>
            {isBtn ? (
                <Link to={path} className={clsx(style.wrapper, style.btn)}>
                    <div>
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>
                    <span>chau khai phong</span>
                </Link>
            ) : (
                <Link to={path} className={clsx(style.wrapper)}>
                    <img src={imgURL} />
                    <span>chau khai phong</span>
                </Link>
            )}
        </>
    );
}

export default SingerLibariItem;
