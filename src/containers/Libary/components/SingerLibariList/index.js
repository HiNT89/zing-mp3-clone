import clsx from 'clsx';
import ckp from '~/assets/imgs/ckp.webp';
import SingerLibariItem from '../SingerLibariItem';
import style from './SingerLibariList.module.scss';
function SingerLibariList({ listSinger }) {
    return (
        <div className={clsx(style.wrapper)}>
            
            {listSinger.map((it) => (
                <SingerLibariItem
                    key={it}
                    path={'#'}
                    imgURL={ckp}
                    isBtn={!it}
                />
            ))}
        </div>
    );
}

export default SingerLibariList;
