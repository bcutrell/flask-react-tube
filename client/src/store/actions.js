import * as actionTypes from './actionTypes';
import axios from '../axios';

export const setVideos = (videos) => {
    return {
        type: actionTypes.ADD_VIDEO,
        videos: videos
    }
};


export const toggleModal = () => {
    return {
        type: actionTypes.TOGGLE_MODAL
    }
}

export const addVideo = (event) => {

    var formData = new FormData();
    formData.append("file", event.target.video.files[0]);
    formData.append("title", event.target.title.value);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    return dispatch => {
        axios.post('/upload', formData, config)
            .then( response => {
                dispatch(setVideos(response.data));
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

export const voteOnVideo = (event, id, type) => {
    var formData = new FormData();
    formData.append("type", type);
    formData.append("id", id);

    return dispatch => {
        axios.post('vote', formData)
            .then( response => {
                dispatch(setVideos(response.data));
            })
            .catch(error => {
                // dispatch(fetchVideosFailed());
            })
    }

}