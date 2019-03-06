const proxy = require('http-proxy-middleware');

module.exports = function useProxy(app) {
  app.use(proxy('/api', {
    target: 'http://localhost:3001/',
    ws: true,
  }));
  app.use(proxy('/ws', {
    target: 'ws://localhost:3001/',
    ws: true,
  }));
};
