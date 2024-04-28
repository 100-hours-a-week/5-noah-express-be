require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

app.use(logger('dev'));

app.use(cookieParser());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    response.sendStatus(200);
});

app.listen(process.env.SERVER_PORT);
