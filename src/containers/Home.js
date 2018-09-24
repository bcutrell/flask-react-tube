import React, { Component } from 'react';
import { connect } from 'react-redux';

import Gallery from '../components/Gallery';
import UploadModal from '../components/UploadModal';

// notes for loading all videos
// https://github.com/gatsbyjs/gatsby/issues/3663
import TestImage from '../assets/test.svg';
import TestVideo from '../assets/test.MOV';

import { addVideo } from '../store/actions';

class Home extends Component {
    state = {
        videos: [TestVideo, TestVideo, TestVideo, TestVideo, TestVideo]
    }

    render() {
        return (
            <div style={ { marginTop: '75px' }}>
                <UploadModal submit={this.props.onVideoAdded}  />
                <Gallery videos={this.state.videos} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        videos: state.videos,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onVideoAdded: (videoName) => dispatch(addVideo(videoName)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
