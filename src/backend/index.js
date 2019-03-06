const ws = require('ws');
const http = require('http');

const app = require('./app');
const bus = require('./bus');

const server = http.createServer(app);
const wss = new ws.Server({ server });
bus.bind(wss);
server.listen(process.env.PORT || 3001);

// process.once('SIGUSR2', () => {
//   console.log('SIGUSR2 received...');
//   cleanup()
//     .catch(err => console.error('Cleanup failed:', err.message))
//     .then(() => {
//       process.kill(process.pid, 'SIGUSR2');
//     });
// });
