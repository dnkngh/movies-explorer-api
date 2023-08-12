require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes/router');
const errorHandler = require('./middlewares/errors/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const requestHandlerCORS = require('./middlewares/requestHandlerCORS');


const { DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { PORT = 3000 } =  process.env;

const app = express();

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, family: 4,});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.disable('x-powered-by');

app.use(requestLogger);
app.use(requestHandlerCORS);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`# Listening port ${PORT}`);
});
