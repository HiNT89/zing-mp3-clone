import clsx from 'clsx';
import style from './Login.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearToast, login } from './action';
import { loadingLogin, loginStatus, toastLogin } from '~/selectors';
import { useNavigate } from 'react-router-dom';
import Toast from '~/components/Toast';
import Loading from '~/components/Loading';
import { getListSong } from '~/components/GlobalStyle/action';
function Login() {
    const [account, setAccount] = useState({
        userName: '',
        password: '',
    });
    const [validate, setValidate] = useState({
        userName: '',
        password: '',
    });
    // selector
    const isLogin = useSelector(loginStatus);
    const isLoading = useSelector(loadingLogin);
    const dataToast = useSelector(toastLogin);
    const navigate = useNavigate();
    useEffect(() => {
        if (isLogin) {
            navigate('/');
            dispatch(getListSong());
        } else {
            navigate('/login');
        }
    }, [isLogin]);
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value });
    };
    const dispatch = useDispatch();
    const handleLogin = () => {
        if (account.userName && account.password) {
            dispatch(login(account));
        } else {
            setValidate({
                userName: account.userName ? '' : ' hãy nhập tài khoản !',
                password: account.password ? '' : ' hãy nhập mật khẩu !',
            });
        }
    };
    return (
        <div className={clsx(style.wrapper)}>
            {isLoading ? <Loading /> : ''}
            <Toast dataToast={dataToast} />
            <div className={clsx(style.login_box)}>
                <h2>Login</h2>
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
                            required=""
                            onChange={(e) => onChangeInput(e)}
                            id="password"
                        />
                        <label htmlFor="password">Password</label>
                        <span>{validate.password}</span>
                    </div>
                    <div className={clsx(style.login_box_sign)}>
                        <span>Do not have an account .</span>{' '}
                        <Link
                            to="/signup"
                            onClick={() => {
                                dispatch(clearToast());
                            }}
                        >
                            signup
                        </Link>
                    </div>
                    <button
                        className={clsx(style.login_btn_submit)}
                        onClick={handleLogin}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
