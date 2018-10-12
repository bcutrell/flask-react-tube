import * as actionTypes from './actionTypes';

const initialState = {
    videos: [],
    modalOpen: false
};

const addVideo = ( state, action ) => {
    return {
        ...state,
        videos: action.videos,
        modalOpen: false
    }
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_VIDEO: return addVideo( state, action );
        case actionTypes.TOGGLE_MODAL: return { ...state, modalOpen: !state.modalOpen }
        default: return state;
    }
};

export default reducer;
