import React from 'react';

const Video = (props) => (
    <video width="100%" height="100%" controls>
    <source src={props.source} type="video/mp4" />
    <source src={props.source} type="video/ogg" />
    Your browser does not support the video tag.
    </video>
);

export default Video;
