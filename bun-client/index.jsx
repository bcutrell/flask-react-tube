import "react";
import { renderToReadableStream } from "react-dom/server";
import { Menu, Container } from 'semantic-ui-react'

function App(props) {
  return (
    <div>
      <link async rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"/>
      <script src="https://cdn.jsdelivr.net/npm/semantic-ui-react/dist/umd/semantic-ui-react.min.js"></script>

      <Menu borderless fixed={'top'}>
          <Container>
            <Menu.Item>
              <a href="/">Home</a>
            </Menu.Item>
          </Container>
      </Menu>

    <Container>
        <button className="ui button" role="button">Upload</button>
    </Container>
  </div>
   );
}

const server = Bun.serve({
    port: 3000,
    async fetch(request) {
        const stream = await renderToReadableStream(<App />);
        return new Response(stream, {
            headers: { "Content-Type": "text/html" },
        });
    },
});

console.log(`Listening on localhost: ${server.port}`);