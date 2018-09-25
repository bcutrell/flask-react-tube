import React, { Component } from 'react';
import { connect } from 'react-redux';

import Gallery from '../components/Gallery';
import UploadModal from '../components/UploadModal';

import { addVideo, initVideos, voteOnVideo } from '../store/actions';

class Home extends Component {
    componentDidMount() {
        this.props.onInitVideos();
    }

    render() {

        let gallery = null;
        if (this.props.videos ) {
            gallery = <Gallery vote={this.props.onVideoVote} videos={this.props.videos} />
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
        onVideoAdded: (event) => dispatch(addVideo(event)),
        onInitVideos: (event) => dispatch(initVideos(event)),
        onVideoVote: (event, id, type) => dispatch(voteOnVideo(event, id, type)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
