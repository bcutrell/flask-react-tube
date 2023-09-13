import * as actionTypes from './actionTypes';

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
        fetch('http://127.0.0.1:5000/upload', {
            method: 'POST',
            body: formData,
            headers: config.headers
        })
        .then(response => response.json())
        .then(data => {
            dispatch(setVideos(data));
        })
        .catch(error => {
            console.log(error);
        })
    }
};

export const initVideos = () => {
    return dispatch => {
        fetch('http://127.0.0.1:5000/videos')
        .then(response => response.json())
        .then(data => {
            dispatch(setVideos(data));
        })
        .catch(error => {
            console.log(error);
        })
    }
};

export const voteOnVideo = (event, id, type) => {
    var formData = new FormData();
    formData.append("type", type);
    formData.append("id", id);

    return dispatch => {
        fetch('http://127.0.0.1:5000/vote', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            dispatch(setVideos(data));
        })
        .catch(error => {
            console.log(error);
        })
    }
};