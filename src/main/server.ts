#!/usr/bin/env node

import { app } from './app';

// used by shutdownCheck in readinessChecks
app.locals.shutdown = false;

const port: number = parseInt(process.env.PORT || '3000', 10);

// if (app.locals.ENV === 'development') {
//   const sslDirectory = path.join(__dirname, 'resources', 'localhost-ssl');
//   const sslOptions = {
//     cert: fs.readFileSync(path.join(sslDirectory, 'localhost.crt')),
//     key: fs.readFileSync(path.join(sslDirectory, 'localhost.key')),
//   };
//   httpsServer = https.createServer(sslOptions, app);
//   httpsServer.listen(port, () => {
//     console.log(`Application started: https://localhost:${port}`);
//   });
// } else {
app.listen(port, '0.0.0.0', () => {
  console.log(`Application started: http://0.0.0.0:${port}`);
});
// }

function gracefulShutdownHandler(signal: string) {
  console.log(`⚠️ Caught ${signal}, gracefully shutting down. Setting readiness to DOWN`);
  // stop the server from accepting new connections
  app.locals.shutdown = true;

  setTimeout(() => {
    console.log('Shutting down application');
    process.exit(0);
  }, 4000);
}

process.on('SIGINT', gracefulShutdownHandler);
process.on('SIGTERM', gracefulShutdownHandler);
