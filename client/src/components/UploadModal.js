import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Modal, Button, Form, Grid } from 'semantic-ui-react';

import { toggleModal } from '../store/actions';

class UploadModal extends Component {

    render() {
        return (
            <Grid>
                <Grid.Row>
                <Grid.Column columns={16}>
                    <Modal open={this.props.modalOpen} trigger={<Button onClick={this.props.toggleModal}>Upload</Button>}>
                        <Modal.Header>Select a Video</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <Form onSubmit={this.props.submit}>
                                <Form.Field>
                                    <label>Title</label>
                                    <input placeholder='Title' name="title" id="title" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Video</label>
                                    <input type="file" id="video" name="video" accept="video/*" />
                                </Form.Field>
                                <Button type='submit'>Submit</Button>
                                <Button type='cancel' onClick={this.props.toggleModal}>Cancel</Button>
                                </Form>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        modalOpen: state.modalOpen,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: (event) => dispatch(toggleModal(event))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UploadModal);
