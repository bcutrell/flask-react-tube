import React from 'react';

import { Modal, Button, Form, Grid } from 'semantic-ui-react';

const UploadModal = (props) => {
    return (
        <Grid>
            <Grid.Row>
            <Grid.Column columns={16}>
                <Modal trigger={<Button>Upload</Button>}>
                    <Modal.Header>Select a Video</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form onSubmit={props.submit}>
                            <Form.Field>
                                <label>Name</label>
                                <input placeholder='Name' />
                            </Form.Field>
                            <Form.Field>
                                <label>Video</label>
                                <input type="file" id="video" name="video" accept="video/mp4, video/MOV" />
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default UploadModal;