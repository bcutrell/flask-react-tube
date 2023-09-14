import "react";
import { renderToReadableStream } from "react-dom/server";

function MyComponent(props) {
   return (
     <body>
       <h1 style={{ color: 'red' }}>{props.message}</h1>
     </body>
   );
}

const server = Bun.serve({
    port: 3000,
    async fetch(request) {
        const stream = await renderToReadableStream(<MyComponent message="Hello Bun!" />);
        return new Response(stream, {
            headers: { "Content-Type": "text/html" },
        });
    },
});

console.log(`Listening on localhost: ${server.port}`);
