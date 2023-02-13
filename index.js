const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  socket.on("message", (rawMessage) => {
    let message = null;
    try {
      message = JSON.parse(rawMessage.toString());
    } catch {}
    if (message) {
      server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    }
  });
});
