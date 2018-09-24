import * as actionTypes from './actionTypes';
import axios from '../axios';

export const setVideos = (videos) => {
    return {
        type: actionTypes.ADD_VIDEO,
        videos: videos
    }
};

export const addVideo = (event) => {

    var formData = new FormData();
    formData.append("file", event.target.video.files[0]);
    formData.append("name", event.target.title.value);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    return dispatch => {
        axios.post('/upload', formData, config)
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
