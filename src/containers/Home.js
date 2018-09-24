import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import { Card, Icon, Image } from 'semantic-ui-react';
// import vid from '../assets/test.MOV';

import TestImage from '../assets/test.svg';
import TestVideo from '../assets/test.MOV';


class Home extends Component {
    render() {
        return (
            <div style={ { marginTop: '50px' }}>
                <h1>Home</h1>
                <Button>Click Here</Button>
                <Card>
                    <Card.Content>
                        <img src={TestImage} alt="Smiley face" height="42" width="42" />
                    </Card.Content>

                    <Card.Content>
                        <video width="100%" height="100%" controls>
                        <source src={TestVideo} type="video/mp4" />
                        <source src={TestVideo} type="video/ogg" />
                        Your browser does not support the video tag.
                        </video>
                    </Card.Content>

                </Card>
            </div>
        )
    }
}

export default Home;
