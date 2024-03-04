const { parse } = require('node:path');
const { WebSocketServer, OPEN } = require('ws');
const {
  getSeatsByScheduleId,
  toggleSeatState,
  checkScheduleExistsById
} = require('./services/webSocket');

const WS_DIR = '/ws/v1/seats/schedule';

const wsServer = new WebSocketServer({ noServer: true });

wsServer.on('error', console.error);

wsServer.on('connection', async (ws, req) => {
  const address = req.socket.remoteAddress;
  const { base } = parse(req.url);

  const scheduleId = Number(base);

  const scheduleIdExists = await checkScheduleExistsById(scheduleId);

  if (!scheduleIdExists) {
    ws.close();
    return;
  } else {
    ws.send(
      JSON.stringify({
        status: 'success',
        message: 'Conexión establecida, y se han enviado los asientos!',
        body: { seats: await getSeatsByScheduleId(scheduleId) }
      })
    );
  }

  console.log('Client connected: ', address);

  ws.on('error', console.error);

  ws.on('close', () => {
    console.log('Client disconnected: ', address);
  });

  ws.on('message', async (data) => {
    const { scheduleId: scheduleIdClient, seatId, type } = JSON.parse(data);

    if (!scheduleIdClient || !seatId || !type) {
      ws.send('Invalid data');
      return;
    }

    if (type === 'lock') {
      await toggleSeatState(scheduleIdClient, seatId);
    }

    const seats = await getSeatsByScheduleId(scheduleIdClient);

    wsServer.clients.forEach(async (client) => {
      //TODO prevent to send to the same client
      if (client.readyState === OPEN && scheduleIdClient === scheduleId) {
        client.send(
          JSON.stringify({
            status: 'update',
            message: 'Asientos actualizados!',
            body: { seats }
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
  const { dir } = parse(req.url);
  if (dir === WS_DIR) {
    //TODO add authentication, reference: https://www.npmjs.com/package/ws#client-authentication
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      wsServer.emit('connection', socket, req);
    });
  } else {
    socket.destroy();
  }
}

module.exports = upgradeHandler;
