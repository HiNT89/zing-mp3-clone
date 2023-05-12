import clsx from 'clsx';
import style from './Search.module.scss';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import ResultSearch from '../ResultSearch';
import styled from 'styled-components';
import { Button } from 'antd';
import HeadlessTippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import { listSong } from '~/selectors';
import { useSelector } from 'react-redux';
import { removeVietnameseTones } from '~/function';
function Search({ handleChangeSong, handleAddSongToList, dataTheme }) {
    const [isOpenResult, setIsOpenResult] = useState(false);
    const [keyword, setKeyword] = useState();
    const [listSongSearch, setListSongSearch] = useState([]);
    const [emtySearch, setEmtySearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef();
    const dataListSong = useSelector(listSong);
    // effect
    useEffect(() => {
        const handleSearch = () => {
            const arrFilter = dataListSong.filter((it) => {
                const strArr = removeVietnameseTones(it.songName.toLowerCase());
                const strKeyword = removeVietnameseTones(keyword.toLowerCase());
                return strArr.includes(strKeyword);
            });
            const result = arrFilter.map((it) => ({
                ...it,
                isLibary: false,
            }));
            return result;
        };
        const timeOut = setTimeout(async () => {
            setIsLoading(true);
            setEmtySearch(false);
            setListSongSearch([]);
            if (keyword) {
                setIsOpenResult(true);
                const result = await handleSearch();
                if (!result.length) {
                    setEmtySearch(true);
                } else {
                    setListSongSearch(result.slice(0, 5));
                }
                setIsLoading(false);
            }
        }, 3000);
        // clearTimeout(timeOut);
    }, [keyword]);
    // function
    const handleOnChangeKeyword = (e) => {
        const { value } = e.target;
        setKeyword(value);
        setIsOpenResult(true);
    };
    // styled-components
    const ButtonSearch = styled(Button)`
        background-color: transparent;
        border: none;
        color: #fff;
    `;
    const handleHideResult = () => {
        setKeyword('');
        setListSongSearch([]);
        setIsOpenResult(false);
    };
    const onClickSearch = () => {
        navigate(`/search/${keyword}`);
        setIsOpenResult(false);
    };
    return (
        <HeadlessTippy
            interactive
            visible={isOpenResult}
            render={(attrs) => (
                <div
                    className={clsx(style.content_top_result)}
                    {...attrs}
                    style={{ backgroundColor: `${dataTheme.bgSearch}` }}
                >
                    <h4>đề xuất cho bạn</h4>
                    <ResultSearch
                        listResult={listSongSearch}
                        handleChangeSong={handleChangeSong}
                        handleAddSongToList={handleAddSongToList}
                        isEmtySearch={emtySearch}
                        isLoading={isLoading}
                        dataTheme = {dataTheme}
                    />
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div
                className={clsx(
                    style.content_top_search,
                    isOpenResult ? style.active : '',
                )}
                style={{ backgroundColor: `${dataTheme.bgSearch}` }}
            >
                <ButtonSearch onClick={onClickSearch}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </ButtonSearch>

                <input
                    type="text"
                    placeholder="tìm kiếm bài hát"
                    value={keyword}
                    onChange={handleOnChangeKeyword}
                    // onClick={() => setIsOpenResult(true)}
                    ref={inputRef}
                />
            </div>
        </HeadlessTippy>
    );
}

export default Search;
