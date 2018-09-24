import React, { Component } from 'react';

import Gallery from '../components/Gallery';
import UploadModal from '../components/UploadModal';

// notes for loading all videos
// https://github.com/gatsbyjs/gatsby/issues/3663
import TestImage from '../assets/test.svg';
import TestVideo from '../assets/test.MOV';

class Home extends Component {
    state = {
        videos: [TestVideo, TestVideo, TestVideo, TestVideo, TestVideo]
    }

    render() {
        return (
            <div style={ { marginTop: '75px' }}>
                <UploadModal />
                <Gallery videos={this.state.videos} />

            </div>
        )
    }
}

export default Home;
