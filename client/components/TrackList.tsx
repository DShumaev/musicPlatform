import React from 'react';
import { ITrack } from '../types/track'
import { Box, Grid } from '@mui/material';
import TrackItem from './TrackItem';

interface TrackListProp {
    tracks: ITrack[];
}

const TrackList: React.FC<TrackListProp> = ({tracks}) => {

    return (
        <Grid>
            <Box p={2}>
                {tracks.map(track =>
                    <TrackItem
                        key={track._id}
                        track={track}
                    />
                )}
            </Box>
        </Grid>
    );
};

export default TrackList;
