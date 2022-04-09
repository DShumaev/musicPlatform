import React from 'react';

interface TrackPlaybackProgressProp {
    left: number;   // current time or sounds level
    right: number;  // time of track or 100% sounds level
    onChange: (e) => void;
}

const TrackPlaybackProgress: React.FC<TrackPlaybackProgressProp> =
    ({
         left, right, onChange
    }) => {

    return (
        <div style={{display: 'flex'}}>
            <input
                type="range"
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            <div>{left} / {right}</div>
        </div>
    );
};

export default TrackPlaybackProgress;
