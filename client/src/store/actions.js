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
    console.log("addVideo");
    const data = new FormData();
    console.log(event.target.video.files[0]);
    data.append('file', event.target.video.files[0]);
    data.append('title', event.target.title.value);

    const config = {
        method: 'POST',
        body: data,
      };

    return dispatch => {
        fetch('http://127.0.0.1:5000/upload', config)
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
    console.log("initVideos");
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

    const data = { id, type };

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    return dispatch => {
        fetch('http://127.0.0.1:5000/vote', config)
        .then(response => response.json())
        .then(data => {
            dispatch(setVideos(data));
        })
        .catch(error => {
            console.log(error);
        })
    }
};