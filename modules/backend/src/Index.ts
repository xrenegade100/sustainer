import server from './Server';

const port = process.env.PORT ?? 5000;

server.listen(port, async () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
