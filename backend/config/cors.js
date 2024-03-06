const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'auth-token',
    'withcredentials',
    'Authorization',
    'authorization',
    'Access-Control-Allow-Origin'
  ]
};

module.exports = corsOptions;
