import { renderToReadableStream } from "react-dom/server";
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Navbar, Nav, Container } from 'react-bootstrap';

// Functions
const initVideos = () => {
  return fetch('http://localhost:5000/videos')
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
};

export const addVideo = (event) => {
  var formData = new FormData();
  formData.append("file", event.target.video.files[0]);
  formData.append("title", event.target.title.value);
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };

  return dispatch => {
      fetch('http://127.0.0.1:5000/upload', {
          method: 'POST',
          body: formData,
          headers: config.headers
      })
      .then(response => response.json())
      .then(data => {
          dispatch(setVideos(data));
      })
      .catch(error => {
          console.log(error);
      })
  }
};

// Components
function UploadModal(props) {
  return (
    <Modal show={props.modalOpen} onHide={props.toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Select a Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={props.submit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" name="title" id="title" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Video</Form.Label>
            <Form.Control type="file" id="video" name="video" accept="video/*" />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
          <Button variant="secondary" onClick={props.toggleModal}>Cancel</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function Home(props) {
  return (
    <div style={{ marginTop: "75px" }}>
      <Button variant="primary" onClick={props.toggleModal}>Upload</Button>

      <UploadModal
        modalOpen={props.modalOpen}
        toggleModal={props.toggleModal}
        submit={props.submit}
      />
    </div>
  );
}

function App(props) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
        </Container>
      </Navbar>
      <Container style={{ marginTop: '75px' }}>
        <Home
          modalOpen={modalOpen}
          toggleModal={toggleModal}
        />
      </Container>
    </div>
  );
}

const server = Bun.serve({
    port: 3000,
    async fetch(request) {
        const url = new URL(request.url);

        if (url.pathname === "/") {
            const response = await fetch("http://localhost:5000/videos");
            const results = (await response.json());
            console.log(results);

            const stream = await renderToReadableStream(<App />);
            return new Response(stream, {
                headers: { "Content-Type": "text/html" },
            });
        }
        return new Response("Not Found", { status: 404 });
    }
});

console.log(`Listening on localhost: ${server.port}`);
