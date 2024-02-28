const { parse } = require('node:path');
const { WebSocketServer, OPEN } = require('ws');

const WS_DIR = '/ws/v1';
const WS_BASE = 'seats';

const wsServer = new WebSocketServer({ noServer: true });

wsServer.on('error', console.error);

wsServer.on('connection', (ws, req) => {
  const address = req.socket.remoteAddress;

  console.log('Client connected: ', address);

  ws.on('error', console.error);

  ws.on('close', () => {
    console.log('Client disconnected: ', address);
  });

  //TODO Check the request and manage a "space" that group by related clients and response with the seats
  ws.send(
    JSON.stringify({
      status: 'success',
      message: 'Conexión establecida, y se han enviado los asientos!',
      body: {
        total: 10,
        seats: [
          { id: 1, status: 'disponible' },
          { id: 2, status: 'reservado' },
          { id: 3, status: 'reservado' },
          { id: 4, status: 'reservado' },
          { id: 5, status: 'disponible' },
          { id: 6, status: 'reservado' },
          { id: 7, status: 'disponible' },
          { id: 8, status: 'reservado' },
          { id: 9, status: 'reservado' },
          { id: 10, status: 'reservado' }
        ]
      }
    })
  );

  ws.on('message', (data) => {
    wsServer.clients.forEach((client) => {
      // TODO Check the request and manage a "space" that group by related clients and response with the seats
      if (client.readyState === OPEN) {
        client.send(
          JSON.stringify({
            status: 'update',
            message: 'Asientos actualizados!',
            body: {
              total: 10,
              seats: [
                { id: 1, status: 'disponible' },
                { id: 2, status: 'reservado' },
                { id: 3, status: 'reservado' },
                { id: 4, status: 'reservado' },
                { id: 5, status: 'bloqueado' },
                { id: 6, status: 'reservado' },
                { id: 7, status: 'bloqueado' },
                { id: 8, status: 'reservado' },
                { id: 9, status: 'reservado' },
                { id: 10, status: 'reservado' }
              ]
            }
          })
        );
      }
    });
  });
});

/**
 * Upgrade request to WebSocket for the path /api/v1/seats/live
 * Reference: https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
 */

function upgradeHandler(req, socket, head) {
  const { base, dir } = parse(req.url);
  if (base === WS_BASE && dir === WS_DIR) {
    //TODO add authentication, reference: https://www.npmjs.com/package/ws#client-authentication
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      wsServer.emit('connection', socket, req);
    });
  } else {
    socket.destroy();
  }
}

module.exports = upgradeHandler;
