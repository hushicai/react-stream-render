import express from 'express';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import Frontend from './client';

const app = express();

app.use('*', (request, response) => {
  // Send the start of your HTML to the browser
  response.write('<html><head><title>Page</title></head><body><div id="root">');

  // Render your frontend to a stream and pipe it to the response
  const stream = renderToNodeStream(<Frontend />);

  stream.pipe(
    response,
    { end: 'false' }
  );

  // When React finishes rendering send the rest of your HTML to the browser
  stream.on('end', () => {
    response.end('</div></body></html>');
  });
});

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});
