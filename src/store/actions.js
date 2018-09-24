import * as actionTypes from './actionTypes';
import axios from '../axios';

export const setVideos = (videos) => {
    return {
        type: actionTypes.ADD_VIDEO,
        videos: videos
    }
};

export const addVideo = (event) => {
    // event.target.name,
    // event.target.video
    const data = {
        name: 1,
        video: 2
    }

    return dispatch => {
        axios.post('/video/new_video')
            .then( response => {
                console.log(response);
                // dispatch(setVideos(response.data));
            })
            .catch(error => {
                // dispatch(addVideosFailed());
                console.log(error);
            })
    }
};

export const initVideos = () => {
    return dispatch => {
        axios.get('videos')
            .then( response => {
                dispatch(setVideos(response.data));
            })
            .catch(error => {
                // dispatch(fetchVideosFailed());
            })
    }
};
