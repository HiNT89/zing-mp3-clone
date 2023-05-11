import clsx from 'clsx';
import style from './Signup.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../Login/action';
import { loginStatus, toastLogin, loadingLogin } from '~/selectors';
import { useNavigate } from 'react-router-dom';
import Toast from '~/components/Toast';
import Loading from '~/components/Loading';
import { getListSong } from '~/components/GlobalStyle/action';
function Signup() {
    const [account, setAccount] = useState({
        userName: '',
        password: '',
        sex: '',
    });
    const [validate, setValidate] = useState({
        userName: '',
        password: '',
        sex: '',
    });
    const isLogin = useSelector(loginStatus);
    const isLoading = useSelector(loadingLogin);
    const dataToast = useSelector(toastLogin);
    const navigate = useNavigate();
    useEffect(() => {
        if (isLogin) {
            navigate('/');
            dispatch(getListSong());
        }
    }, [isLogin]);
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value });
    };
    const onChangeInputSex = (e) => {
        const { name, id } = e.target;
        setAccount({ ...account, [name]: id });
    };
    const dispatch = useDispatch();
    const handleSignup = () => {
        if (account.password && account.userName && account.sex) {
            dispatch(
                signup({
                    ...account,
                    mySong: [],
                    history: [],
                    playlists: [],
                    setting: { theme: 'blue' },
                }),
            );
        } else {
            setValidate({
                userName: account.userName ? '' : ' hãy nhập tài khoản',
                password: account.userName ? '' : ' hãy nhập mật khẩu',
                sex: account.userName ? '' : ' hãy chọn giới tính',
            });
        }
    };

    return (
        <div className={clsx(style.wrapper)}>
            {isLoading ? <Loading /> : ''}
            <Toast dataToast={dataToast} />
            <div className={clsx(style.login_box)}>
                <h2>Signup</h2>
                <div className={style.login_box_content}>
                    <div className={clsx(style.user_box)}>
                        <input
                            type="text"
                            name="userName"
                            required=""
                            onChange={(e) => onChangeInput(e)}
                            value={account.userName}
                            id="userName"
                        />
                        <label htmlFor="userName">Username</label>
                        <span>{validate.userName}</span>
                    </div>
                    <div className={clsx(style.user_box)}>
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => onChangeInput(e)}
                            id="password"
                        />
                        <label htmlFor="password">Password</label>
                        <span>{validate.password}</span>
                    </div>

                    <div className={clsx(style.user_box_sex)}>
                        <div>
                            <input
                                type="checkbox"
                                name="sex"
                                onChange={(e) => onChangeInputSex(e)}
                                id="male"
                                checked={account.sex === 'male'}
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="sex"
                                onChange={(e) => onChangeInputSex(e)}
                                id="female"
                                checked={account.sex === 'female'}
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                        <span>{validate.sex}</span>
                    </div>
                    <button
                        className={clsx(style.login_btn_submit)}
                        onClick={handleSignup}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Signup
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
