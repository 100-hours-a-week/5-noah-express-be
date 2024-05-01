require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');

const signInRouter = require('./src/router/signInRouter');
const signUpRouter = require('./src/router/signUpRouter');
const signOutRouter = require('./src/router/signOutRouter');
const userRouter = require('./src/router/userRouter');
const postRouter = require('./src/router/postRouter');

const app = express();

app.use(logger('dev'));

app.use(cookieParser());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({origin: 'http://localhost:3000', credentials: true}));

app.use(session({
    secret: process.env.SERVER_SESSION_KEY, resave: false, // 변경되지 않은 세션도 저장할지 여부
    saveUninitialized: true, // 초기화되지 않은 세션도 저장할지 여부
}));

app.use('/api/sign-in', signInRouter);
app.use('/api/sign-up', signUpRouter);
app.use('/api/sign-out', signOutRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.listen(process.env.SERVER_PORT);
