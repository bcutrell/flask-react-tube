import React, { Component } from 'react';
import { connect } from 'react-redux';

import Gallery from '../components/Gallery';
import UploadModal from '../components/UploadModal';

// notes for loading all videos
// https://github.com/gatsbyjs/gatsby/issues/3663

import { addVideo, initVideos } from '../store/actions';

class Home extends Component {
    componentDidMount() {
        this.props.onInitVideos();
    }

    render() {

        let gallery = null;
        if (this.props.videos ) {
            const videos = this.props.videos.map( vid => vid.filepath )
            gallery = <Gallery videos={videos} />
        }

        return (
            <div style={ { marginTop: '75px' }}>
                <UploadModal submit={this.props.onVideoAdded}  />
                { gallery }
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
        onInitVideos: (videoName) => dispatch(initVideos(videoName)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
