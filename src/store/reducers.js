import * as actionTypes from './actionTypes';

const initialState = {
    videos: [],
};

const addVideo = ( state, action ) => {
    return {
        ...state,
        videos: action.videos
    }
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_VIDEO: return addVideo( state, action );
        default: return state;
    }
};

export default reducer;
