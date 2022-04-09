import React from 'react';
import { ITrack } from '../types/track';
import { Card, Grid, IconButton } from '@mui/material';
import styles from '../styles/TrackItem.module.scss';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAction } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import axios from 'axios';
import { changeTrackList } from '../store/actions-creators/tracks';
import { useDispatch } from 'react-redux';

interface TrackItemProps {
    track: ITrack;
}

const TrackItem: React.FC<TrackItemProps> = ({track}) => {
    const router = useRouter();
    const {playTrack, pauseTrack, setActiveTrack} = useAction();
    const {pause, active} = useTypedSelector(state => state.player);
    const {tracks} = useTypedSelector(state => state.track);
    const dispatch = useDispatch();

    const deleteTrackHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    };

    const playPauseTrackHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!active || active._id !== track._id) {
            setActiveTrack(track);
        };
        if (pause) {
            playTrack();
        } else {
            pauseTrack();
        };
    };

    const setImageTrackPlaying = () => {
        if (!active || pause) {
            return (<PlayArrow />);
        };
        if (active && !pause && (active._id !== track._id)) {
            return (<PlayArrow />);
        } else {
            return (<Pause />);
        };
    };

    const removeTrackHandler = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/tracks/' + track._id);
            if (!response.data) {
                return;
            };
            dispatch(changeTrackList(tracks.filter(track => track._id !== response.data)));
        } catch (e) {
            console.log(e);
        };
    };

    return (
        <Card
            className={styles.track}
            onClick={() => router.push('/tracks/' + track._id)}
        >
            <IconButton onClick={playPauseTrackHandle}>
                {
                    setImageTrackPlaying()
                }
            </IconButton>
            <img
                width={70}
                height={70}
                src={'http://localhost:5000/' + track.picture}
            />
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            {active && <div>02:42 / 03:22</div>}
            <IconButton
                onClick={deleteTrackHandle}
                style={{marginLeft: 'auto'}}
            >
                <Delete onClick={removeTrackHandler} />
            </IconButton>
        </Card>
    );
};

export default TrackItem;
