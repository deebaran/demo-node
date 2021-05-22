const http = require('http');
const express = require ('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const logger = require('./logger/logger');

const app = express();

const userRoutes = require('./routes/auth');

dotenv.config();

//Connect to DB
try{
    mongoose.connect(process.env.DB_CONNECT, 
        { useNewUrlParser: true },
        () => logger.log('info', `Connected to DB! ${process.env.DB_CONNECT}`)
    );
}catch(err){
    logger.log('error', 'DB Connection error');
}

app.use(helmet());

app.use(express.json());

app.use('/api/user',  userRoutes);

app.listen(8000, () =>  logger.log('log', 'Express server up and running'));
