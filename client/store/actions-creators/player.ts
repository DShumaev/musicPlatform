import {PlayerAction, PlayerActionTypes} from "../../types/player";
import {ITrack} from "../../types/track";

export const playTrack = (): PlayerAction => {
    return { type: PlayerActionTypes.PLAY };
};

export const pauseTrack = (): PlayerAction => {
    return { type: PlayerActionTypes.PAUSE };
};

export const setDuration = (payload: number): PlayerAction => {
    return {
        payload,
        type: PlayerActionTypes.SET_DURATION,
    };
};

export const setVolume = (payload: number): PlayerAction => {
    return {
        payload,
        type: PlayerActionTypes.SET_VOLUME,
    };
};

export const setCurrentTime = (payload: number): PlayerAction => {
    return {
        payload,
        type: PlayerActionTypes.SET_CURRENT_TIME,
    };
};

export const setActiveTrack = (payload: ITrack): PlayerAction => {
    return {
        payload,
        type: PlayerActionTypes.SET_ACTIVE,
    };
};
