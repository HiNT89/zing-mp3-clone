import clsx from 'clsx';
import style from './NavItem.module.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { Link } from 'react-router-dom';

function NavItem({ title, children, path, isActive }) {
    return (
        <Tippy content={<span>{title}</span>}>
            <Link
                className={clsx(
                    style.slider_nav_item,
                    isActive ? style.active : '',
                )}
                to={path}
            >
                <div className={clsx(style.mark)}></div>
                {children}
                {title}
                <div className={clsx(style.slider_nav_item_play)}>
                    <i className="fa-solid fa-circle-play"></i>
                </div>
            </Link>
        </Tippy>
    );
}

export default NavItem;
