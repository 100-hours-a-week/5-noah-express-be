require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');

const postRouter = require('./src/router/postRouter');

const app = express();

app.use(logger('dev'));

app.use(cookieParser());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/posts', postRouter);

app.listen(process.env.SERVER_PORT);
