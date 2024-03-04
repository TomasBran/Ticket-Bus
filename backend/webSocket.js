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
  const { searchParams } = new URL(req.url);

  if (!(searchParams.has('scheduleId') && searchParams.has('date'))) {
    //TODO Add sanitization and validation of the params
    ws.close();
    return;
  }

  const scheduleId = Number(searchParams.get('scheduleId'));
  const date = new Date(searchParams.get('date'));

  const scheduleIdExists = await checkScheduleExistsById(scheduleId);

  if (!scheduleIdExists) {
    ws.close();
    return;
  } else {
    ws.send(
      JSON.stringify({
        status: 'success',
        message: 'Conexión establecida, y se han enviado los asientos!',
        body: { seats: await getSeatsByScheduleId(scheduleId, date) }
      })
    );
  }

  console.log('Client connected: ', address);

  ws.on('error', console.error);

  ws.on('close', () => {
    console.log('Client disconnected: ', address);
  });

  ws.on('message', async (data) => {
    const {
      scheduleId: scheduleIdClient,
      seatId,
      type,
      date: dateClient
    } = JSON.parse(data);

    if (!(scheduleIdClient && seatId && type && dateClient)) {
      ws.send(
        JSON.stringify({
          status: 'error',
          message: 'Faltan datos para actualizar los asientos'
        })
      );
      return;
    }

    if (type === 'lock') {
      await toggleSeatState(scheduleIdClient, seatId, dateClient);
    }

    const seats = await getSeatsByScheduleId(scheduleIdClient, dateClient);

    wsServer.clients.forEach(async (client) => {
      //Prevent sending to the same client
      if (
        client.readyState === OPEN &&
        scheduleIdClient === scheduleId &&
        dateClient === date
      ) {
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
  const { pathname } = new URL(req.url);

  if (pathname === WS_DIR) {
    //TODO add authentication, reference: https://www.npmjs.com/package/ws#client-authentication
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      wsServer.emit('connection', socket, req);
    });
  } else {
    socket.destroy();
  }
}

module.exports = upgradeHandler;
