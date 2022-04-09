import React, { useEffect } from 'react';
import { Grid, IconButton } from '@mui/material';
import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import styles from '../styles/Player.module.scss';
import TrackPlaybackProgress from './TrackPlaybackProgress';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useAction } from '../hooks/useActions';

let audio;

const Player = () => {
    const {currentTime, duration, volume, active, pause} = useTypedSelector(state => state.player);
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration} = useAction();

    useEffect(() => {
        if (!audio) {
          audio = new Audio();
        } else {
            setAudio();
        };
    }, [active]);

    useEffect(() => {   // for play or pause track from TrackItem
        if (pause) {
            audio.pause();
        } else {
            audio.play();
        };
    }, [pause]);

    const setAudio = () => {
        if (active) {
            audio.src = 'http://localhost:5000/' + active.audio;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration));  // in seconds
            };
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime));
            };
        };
    };

    const playPause = () => {
        if (pause) {
            audio.play();
            playTrack();
        } else {
            audio.pause();
            pauseTrack();
        };
    };

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value));
        audio.volume = Number(e.target.value) / 100;  // audio volume change in 0 - 1
    };

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTime(Number(e.target.value));
        audio.currentTime = Number(e.target.value);
    };

    return (
        <div className={styles.player}>
            <IconButton onClick={playPause}>
                {pause
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{active?.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
            </Grid>
            <TrackPlaybackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
            <VolumeUp style={{marginLeft: 'auto'}} />
            <TrackPlaybackProgress left={volume} right={100} onChange={changeVolume} />
        </div>
    );
};

export default Player;
