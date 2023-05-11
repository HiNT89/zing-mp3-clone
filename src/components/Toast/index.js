import './style.css';
import toast from './funtion';
import { useEffect } from 'react';

const Toast = ({ dataToast }) => {
    useEffect(() => {
        if (dataToast.isShow) toast(dataToast);
    }, [dataToast]);

    return (
        <div>
            <div id="toast"></div>
        </div>
    );
};

export default Toast;
