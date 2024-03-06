const { WebSocketServer, OPEN } = require('ws');
const {
  getSeatsByScheduleId,
  checkScheduleExistsById,
  isSeatLocked,
  lockSeat,
  unlockSeat
} = require('./services/webSocket');
const { querySchema, messageSchema } = require('./schemas/socketSchema');

const WS_HOST = process.env.WS_HOST || 'ws://localhost:3000';
const WS_PATH = '/ws/v1/seats/schedule';
const LOCK_SEAT_DELAY = process.env.LOCK_SEAT_DELAY || '5000'; // 5 seconds

const wsServer = new WebSocketServer({ noServer: true });

const sendError = (message = 'Error desconocido') =>
  JSON.stringify({ status: 'error', message });

const getQuery = (url, onError) => {
  try {
    const { searchParams } = new URL(url, WS_HOST);

    if (!(searchParams.has('scheduleId') && searchParams.has('date'))) {
      throw new Error('scheduleId and date are required');
    }

    const query = {
      scheduleId: Number(searchParams.get('scheduleId')),
      date: searchParams.get('date')
    };

    const result = querySchema.safeParse(query);
    if (!result.success) {
      throw new Error(
        result.error.issues.map((issue) => issue.message).join('; ')
      );
    }

    return {
      scheduleId: query.scheduleId,
      date: new Date(query.date)
    };
  } catch (error) {
    onError(error);
    return {
      scheduleId: null,
      date: null
    };
  }
};

const handleIncomingMessage = async (
  ws,
  message,
  scheduleIdServer,
  dateServer
) => {
  const data = JSON.parse(message);

  const result = messageSchema.safeParse(data);

  if (!result.success) {
    ws.send(
      sendError(result.error.issues.map((issue) => issue.message).join('; '))
    );
    return;
  }

  const { scheduleId, seatId, type, date } = data;

  const dateParsed = new Date(date);

  const notifyClients = async () => {
    const seats = await getSeatsByScheduleId(scheduleId, date);
    wsServer.clients.forEach((client) => {
      if (
        client.readyState === OPEN &&
        scheduleId === scheduleIdServer &&
        dateParsed.getTime() === dateServer.getTime()
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
  };

  if (type === 'lock') {
    const isSeatLockedResponse = await isSeatLocked(
      seatId,
      scheduleId,
      dateParsed
    );

    if (isSeatLockedResponse) {
      await unlockSeat(seatId, scheduleId, dateParsed);
      notifyClients();
    } else {
      await lockSeat(seatId, scheduleId, dateParsed);
      notifyClients();

      setTimeout(async () => {
        await unlockSeat(seatId, scheduleId, dateParsed);
        notifyClients();
      }, Number(LOCK_SEAT_DELAY));
    }
  }

  if (type === 'reservation') {
    notifyClients();
  }
};

const handleConnection = async (ws, req) => {
  const address = req.socket.remoteAddress;
  console.log('Client connected: ', address);

  // Get and validate query
  const { scheduleId, date } = getQuery(req.url, (err) => {
    if (err) ws.send(sendError(err.message));
  });
  if (!scheduleId && !date) {
    ws.close();
    return;
  }

  // Check if schedule exists
  console.log('scheduleId', scheduleId);
  const scheduleExists = checkScheduleExistsById(scheduleId);
  if (!scheduleExists) {
    ws.send(sendError('No se encontró la ruta'));
    ws.close();
    return;
  }

  // Send seats to client
  ws.send(
    JSON.stringify({
      status: 'success',
      message: 'Conexión establecida, y se han enviado los asientos!',
      body: {
        seats: await getSeatsByScheduleId(scheduleId, date)
      }
    })
  );

  // Handle errors in the connection
  ws.on('error', (err) => {
    console.log(err);
  });

  // Handle connection close
  ws.on('close', () => {
    console.log('Client disconnected: ', address);
  });

  // Handle incoming messages
  ws.on('message', (message) => {
    handleIncomingMessage(ws, message, scheduleId, date);
  });
};

wsServer.on('error', console.error);

wsServer.on('connection', handleConnection);

/**
 * Upgrade request to WebSocket for the path /api/v1/seats/live
 * Reference: https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
 */
function upgradeHandler(req, socket, head) {
  const { pathname } = new URL(req.url, WS_HOST);

  if (pathname === WS_PATH) {
    //TODO add authentication, reference: https://www.npmjs.com/package/ws#client-authentication
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      wsServer.emit('connection', socket, req);
    });
  } else {
    socket.destroy();
  }
}

module.exports = upgradeHandler;
