import clsx from 'clsx';
import style from './HeaderContent.module.scss';
import { Button, Avatar, Modal } from 'antd';
import Tippy from '@tippyjs/react';
import ckp from '~/assets/imgs/ckp.webp';
import 'tippy.js/dist/tippy.css'; //
import { useState } from 'react';
import Search from '../Search';
import themes from '../../theme';
function HeaderContent({
    handleChangeSong,
    handleAddSongToList,
    isMale,
    handleLogout,
    dataTheme,
    handleUpdateUser,
}) {
    const [isOpenTheme, setIsOpenTheme] = useState(false);
    return (
        <div className={clsx(style.content_top)}>
            <div>
                {/* ---------- controls */}
                {/* <div className={clsx(style.content_top_controls)}>
                    <Button
                        className={clsx(
                            style.content_top_control,
                            style.not_active,
                        )}
                        disabled
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                    </Button>
                    <Button
                        className={clsx(
                            style.content_top_control,
                            style.not_active,
                        )}
                        disabled
                    >
                        <i className="fa-solid fa-arrow-right"></i>
                    </Button>
                </div> */}
                {/* ---------- search */}
                <Search
                    handleChangeSong={handleChangeSong}
                    handleAddSongToList={handleAddSongToList}
                    dataTheme={dataTheme}
                    handleUpdateUser = {handleUpdateUser}
                />
            </div>
            {/* ------------------------------ */}
            <div className={clsx(style.content_top_btns)}>
                <Tippy content={<span>chủ đề</span>}>
                    <Button
                        className={clsx(style.content_top_btn)}
                        ghost
                        onClick={() => setIsOpenTheme(true)}
                    >
                        <i className="fa-solid fa-palette"></i>
                    </Button>
                </Tippy>
                <Tippy content={<span>cài đặt</span>}>
                    <Button className={clsx(style.content_top_btn)} ghost>
                        <i className="fa-solid fa-gear"></i>
                    </Button>
                </Tippy>
                <div className={clsx(style.content_top_account)}>
                    <Avatar
                        size={40}
                        src={
                            isMale ? (
                                <i className="fa-solid fa-mars"></i>
                            ) : (
                                <i className="fa-solid fa-venus"></i>
                            )
                        }
                    />
                    <div>
                        <Button onClick={handleLogout}>Logout</Button>
                    </div>
                </div>
            </div>
            {/* modal theme */}
            <Modal
                open={isOpenTheme}
                footer={null}
                onCancel={() => setIsOpenTheme(false)}
                className={clsx(style.modal_theme_wrapper)}
            >
                <div
                    className={clsx(style.modal_theme_content)}
                    style={{ backgroundColor: `${dataTheme.bgModal}` }}
                >
                    <h3 className={clsx(style.modal_theme_title)}>giao diện</h3>
                    <div className={clsx(style.modal_theme_row)}>
                        <h4 className={clsx(style.modal_theme_row_title)}>
                            Dynamic
                        </h4>
                        <div className={clsx(style.modal_theme_row_list)}>
                            {themes.map((it, index) => (
                                <div
                                    key={index}
                                    className={clsx(style.modal_theme_row_item)}
                                >
                                    <div
                                        className={clsx(
                                            style.modal_theme_row_img,
                                        )}
                                    >
                                        {it.isBgIMG ? (
                                            <img src={dataTheme.srcIMG} />
                                        ) : (
                                            <div
                                                className={clsx(
                                                    style.modal_theme_row_color,
                                                )}
                                                style={{
                                                    backgroundColor: `${it.bgColorSongPlay}`,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        backgroundColor: `${it.bgSearch}`,
                                                    }}
                                                ></div>
                                            </div>
                                        )}

                                        <div
                                            className={clsx(
                                                style.modal_theme_row_img_hover,
                                            )}
                                        >
                                            <Button
                                                onClick={() =>
                                                    handleUpdateUser(
                                                        it.nameTheme,
                                                        'updateTheme',
                                                    )
                                                }
                                            >
                                                áp dụng
                                            </Button>
                                        </div>
                                    </div>
                                    <span>{it.nameTheme}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default HeaderContent;
