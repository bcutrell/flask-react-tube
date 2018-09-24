import React from 'react';
import Video from './Video';

import {Icon, Grid, Card, Button } from 'semantic-ui-react';

const Gallery = (props) => {
    const cells = props.videos.map((video, i) => {
        return (
            <Grid.Column key={i} width={4}>
                <Card>
                    <Card.Content>
                        <Video source={video} />
                    </Card.Content>

                    <Card.Content extra>
                        <span>
                        <a>
                            <Icon name='beer' />
                            22
                        </a>
                        </span>
                        <span style={{ float: 'right'}}>
                        <a>
                            <Icon name='beer' />
                            -12
                        </a>
                        </span>
                    </Card.Content>
                </Card>

            </Grid.Column>
        )
    });

    return (
        <Grid stackable>
            { cells }
        </Grid>
    )
}

export default Gallery;
