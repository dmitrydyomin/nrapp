const ws = require('ws');

const bus = {
  bind(wss) {
    this.wss = wss;
  },
  emit(type, payload = null) {
    if (!this.wss) {
      return;
    }
    const data = JSON.stringify({ type, payload });
    this.wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(data);
      }
    });
  },
};

module.exports = bus;
