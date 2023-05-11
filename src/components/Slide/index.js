import style from './Slide.module.scss';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { Button } from 'antd';
// import { dataURL } from './dataURL';
function Slide({ dataURL }) {
    let [currentStart, setCurrentStart] = useState(0);
    const [listURL, setListURL] = useState(dataURL);
    const [listURLSide, setListURLSide] = useState([]);
    const [isNextSlide, setIsNextSlide] = useState(true);
    const limit = 3;
    // effect
    useEffect(() => {
        currentStart = currentStart > listURL.length ? 0 : currentStart;
        const remaining = listURL.length - currentStart;
        if (remaining > limit) {
            let end = currentStart + limit;
            let newList = listURL.slice(currentStart, end);
            setListURLSide(newList);
        } else {
            const itemAdd = limit - remaining;
            const list1 = listURL.slice(currentStart);
            const list2 = listURL.slice(0, itemAdd);
            const newList = list1.concat(list2);
            setListURLSide(newList);
        }
    }, [currentStart]);
    //fn
    const handleNextSLide = () => {
        setIsNextSlide(true);
        setCurrentStart(
            currentStart > listURL.length - 1 ? 0 : currentStart + 1,
        );
    };
    const handlePrevSLide = () => {
        setIsNextSlide(false);
        setCurrentStart(currentStart ? currentStart - 1 : listURL.length - 1);
    };
    return (
        <div className={clsx(style.slide_wrapper)}>
            <div className={clsx(style.slide_btnControl)}>
                <Button  onClick={handlePrevSLide}>
                    <i className="fa-solid fa-chevron-left"></i>
                </Button>

                <Button  onClick={handleNextSLide}>
                    <i className="fa-solid fa-chevron-right"></i>
                </Button>
            </div>
            <div className={clsx(style.slide_content)}>
                {listURLSide.map((it) => {
                    return (
                        <div
                            className={clsx(
                                style.slide_item,
                                isNextSlide ? style.nextSlide : style.prevSlide,
                            )}
                            key={it.id}
                        >
                            <img src={it.URL} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Slide;
