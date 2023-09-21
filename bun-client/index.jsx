import { renderToReadableStream } from "react-dom/server";
import { Menu, Container } from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';

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

// Components
function Home(props) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    initVideos().then(data => {
      setVideos(data);
      console.log(data);
    });
  }, []);

  return (
    <div style={ { marginTop: '75px' } }>
      <button className="ui button" role="button">Upload</button>
    </div>
  )
};

function App(props) {

  return (
    <div>
      <link async rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"/>
      {/* <script src="https://cdn.jsdelivr.net/npm/semantic-ui-react/dist/umd/semantic-ui-react.min.js"></script> */}

      <Menu borderless fixed={'top'}>
          <Container>
            <Menu.Item>
              <a href="/">Home</a>
            </Menu.Item>
          </Container>
      </Menu>

    <Container>
      <Home/>
    </Container>

  </div>
   );
}

const server = Bun.serve({
    port: 3000,
    async fetch(request) {
        const url = new URL(request.url);

        if (url.pathname === "/") {
            const stream = await renderToReadableStream(<App />);
            return new Response(stream, {
                headers: { "Content-Type": "text/html" },
            });
        }
        return new Response("Not Found", { status: 404 });
    }
});

console.log(`Listening on localhost: ${server.port}`);
