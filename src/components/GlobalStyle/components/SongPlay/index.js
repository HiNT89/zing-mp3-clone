import clsx from 'clsx';
import style from './SongPlay.module.scss';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateCountSongPlay, playSong } from '../../action';
import { song, play, listSongPlay, dataUser } from '~/selectors';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { secondsToMinutes } from './actionAudio';
import defaultIMG from '~/assets/imgs/default.webp';
function SongPlay(props) {
    const {
        toggleModalPlayList,
        handleNextSong,
        handlePrevSong,
        handleUpdateUser,
        handleUpdateSong,
        dataTheme,
    } = props;
    const [audioInfo, setAudioInfo] = useState({
        // isRepeat: false,
        // isRandom: false,
        currentTime: `00:00`,
        duration: '',
    });
    const [setting, setSetting] = useState({
        isRepeat: false,
        isRandom: false,
    });
    const [volume, setVolume] = useState(10);

    const dispatch = useDispatch();
    // selector
    const songInfo = useSelector(song);
    const isPlay = useSelector(play);
    const { mySong } = useSelector(dataUser);
    const listPlay = useSelector(listSongPlay);
    let audioRef = useRef(new Audio());
    const [isLibary, setIsLibary] = useState(false);
    //
    const seekTime = (e) => {
        const { duration } = audioRef.current;
        const { value } = e.target;
        const newCurrentTime = (value * duration) / 500;
        audioRef.current.currentTime = newCurrentTime;
    };
    const handleVolume = (e) => {
        const { value } = e.target;
        setVolume(value);
        const newVolume = value / 10;
        audioRef.current.volume = newVolume;
    };
    // effect
    useEffect(() => {
        if (mySong) setIsLibary(mySong.includes(songInfo.id));
    }, [mySong]);
    useEffect(() => {
        audioRef.current.src = songInfo.audioURL;
        const audio = audioRef.current;
        const handleLoadedmetadata = () => {
            const newDuration = secondsToMinutes(audio.duration);
            setAudioInfo({
                ...audioInfo,
                duration: newDuration,
            });
        };
        audio.addEventListener('loadedmetadata', handleLoadedmetadata);
    }, [songInfo]);
    useEffect(() => {
        const audio = audioRef.current;
        const handleTimeUpdate = () => {
            const newCurrentTime = secondsToMinutes(audio.currentTime);
            const newDuration = secondsToMinutes(audio.duration || 0);
            setAudioInfo({
                ...audioInfo,
                currentTime: newCurrentTime,
                duration: newDuration,
            });
        };
        const handleLoadedmetadata = () => {
            const newDuration = secondsToMinutes(audio.duration);
            setAudioInfo({
                ...audioInfo,
                duration: newDuration,
            });
        };
        if (isPlay) {
            audio.play();
            audio.addEventListener('loadedmetadata', handleLoadedmetadata);
            audio.addEventListener('timeupdate', handleTimeUpdate);
        } else {
            audio.pause();
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        }
    }, [isPlay]);
    useLayoutEffect(() => {
        const audio = audioRef.current;
        const progressInput = document.getElementById('progress');
        progressInput.value = handleProgress();
        if (
            secondsToMinutes(audio.currentTime) === audioInfo.duration &&
            audioInfo.duration !== `0:00`
        ) {
            handleUpdateUser(songInfo.id, 'updateHistory');
            handleUpdateSong('updateCount', songInfo);
            handleNextSong({
                repeat: setting.isRepeat,
                random: setting.isRandom,
            });
        }
    }, [audioInfo.currentTime]);

    // function audio

    const handleProgress = () => {
        const { currentTime, duration } = audioRef.current;
        const percent = Math.ceil((currentTime * 500) / duration);
        return percent || 0;
    };
    return (
        <div
            className={clsx(style.songPlay)}
            style={{ backgroundColor: `${dataTheme.bgColorSongPlay}` }}
        >
            <div className={clsx(style.songPlay_info)}>
                <img src={songInfo.imgURL || defaultIMG} />
                <div className={clsx(style.songPlay_info_name)}>
                    <h5>{songInfo.songName}</h5>
                    <span>{songInfo.singer}</span>
                </div>

                <div>
                    <Button
                        className={clsx(
                            isLibary ? style.btn_heart_active : style.btn_heart,
                        )}
                        onClick={() =>
                            handleUpdateUser(songInfo.id, 'updateMySong')
                        }
                    >
                        <i className="fa-solid fa-heart"></i>
                    </Button>
                </div>
            </div>
            <div className={clsx(style.songPlay_controls)}>
                <div className={clsx(style.songPlay_controls_list)}>
                    <Button
                        className={clsx(
                            setting.isRandom
                                ? style.songPlay_control_active
                                : style.songPlay_control,
                        )}
                        onClick={() =>
                            setSetting({
                                ...setting,
                                isRandom: !setting.isRandom,
                            })
                        }
                    >
                        <i className="fa-solid fa-shuffle"></i>
                    </Button>
                    <Button
                        style={{ border: 'none' }}
                        ghost={true}
                        onClick={() =>
                            handlePrevSong({
                                repeat: setting.isRepeat,
                                random: setting.isRandom,
                            })
                        }
                    >
                        <i className="fa-solid fa-backward-step"></i>
                    </Button>
                    <Button
                        style={{ border: 'none' }}
                        ghost={true}
                        onClick={() => dispatch(playSong(!isPlay))}
                    >
                        <span className={isPlay ? 'visible' : 'invisible'}>
                            <i className="fa-solid fa-pause"></i>
                        </span>
                        <span className={!isPlay ? 'visible' : 'invisible'}>
                            <i className="fa-solid fa-play"></i>
                        </span>
                    </Button>

                    <Button
                        style={{ border: 'none', position: 'relative' }}
                        ghost={true}
                        onClick={() =>
                            handleNextSong({
                                repeat: setting.isRepeat,
                                random: setting.isRandom,
                            })
                        }
                    >
                        <i className="fa-solid fa-forward-step"></i>
                    </Button>
                    <Button
                        className={clsx(
                            setting.isRepeat
                                ? style.songPlay_control_active
                                : style.songPlay_control,
                        )}
                        onClick={() =>
                            setSetting({
                                ...setting,
                                isRepeat: !setting.isRepeat,
                            })
                        }
                    >
                        <i className="fa-solid fa-repeat"></i>
                    </Button>
                </div>
                <div className={clsx(style.songPlay_controls_time)}>
                    <span>{audioInfo.currentTime}</span>
                    <input
                        id="progress"
                        className={clsx(style.progress)}
                        type="range"
                        step="1"
                        min="0"
                        max="500"
                        onChange={(e) => seekTime(e)}
                    />
                    <span>{audioInfo.duration}</span>
                </div>
            </div>
            <div className={clsx(style.songPlay_list)}>
                <Button
                    className={+volume ? 'visible' : 'invisible'}
                    style={{ border: 'none' }}
                    ghost={true}
                >
                    <i className="fa-solid fa-volume-high"></i>
                </Button>
                <Button
                    className={!+volume ? 'visible' : 'invisible'}
                    style={{ border: 'none' }}
                    ghost={true}
                >
                    <i className="fa-solid fa-volume-xmark"></i>
                </Button>

                <input
                    id="volume"
                    className={clsx(style.songPlay_volume)}
                    type="range"
                    step="1"
                    min="0"
                    max="10"
                    value={volume}
                    onChange={(e) => handleVolume(e)}
                />
                <Button
                    style={{ border: 'none' }}
                    ghost={true}
                    onClick={toggleModalPlayList}
                >
                    <i className="fa-solid fa-list-ol"></i>
                </Button>
            </div>
        </div>
    );
}

export default SongPlay;
