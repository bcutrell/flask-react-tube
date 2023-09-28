import React from 'react';
import Video from './Video';

import {Label, Icon, Grid, Card, Button } from 'semantic-ui-react';

const Gallery = (props) => {
    const cells = props.videos.map((video, i) => {
        console.log(video);

        return (
            <Grid.Column key={i}>
                <Card>
                    <Card.Content>
                        <Video source={video.file_url} />
                    </Card.Content>

                    <Card.Content extra>
                        <span>
                            <Button
                                as='div'
                                icon='beer'
                                color='green'
                                onClick={(event) => props.vote(event, video.id, 'UP')}
                                label={{ as: 'a', basic: true, pointing: 'right', content: video.upvotes }}
                                labelPosition='left' />
                        </span>
                        <span style={{ float: 'right'}}>
                            <Button
                                as='div'
                                icon='beer'
                                color='red'
                                onClick={(event) => props.vote(event, video.id, 'DOWN')}
                                label={{ as: 'a', basic: true, pointing: 'left', content: -video.downvotes }}
                                labelPosition='right' />
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
