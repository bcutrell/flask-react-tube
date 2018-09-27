import React from 'react';
import Video from './Video';

import {Icon, Grid, Card, Button } from 'semantic-ui-react';

const Gallery = (props) => {
    const cells = props.videos.map((video, i) => {

        return (
            <Grid.Column key={i}>
                <Card>
                    <Card.Content>
                        <Video source={video.filepath} />
                    </Card.Content>

                    <Card.Content extra>
                        <span>
                        <a onClick={(event) => props.vote(event, video.id, 'UP')}>
                            <Icon name='beer' />
                            { video.upvotes }
                        </a>
                        </span>
                        <span style={{ float: 'right'}}>
                        <a onClick={(event) => props.vote(event, video.id, 'DOWN')}>
                            <Icon name='beer' />
                            { -video.downvotes }
                        </a>
                        </span>
                    </Card.Content>
                </Card>

            </Grid.Column>
        )
    });

    return (
        <Grid stackable columns={2}>
            { cells }
        </Grid>
    )
}

export default Gallery;
