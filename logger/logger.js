const { 
    createLogger, 
    transports,
    format
} = require('winston');

const dotenv = require('dotenv');
const winston = require('winston/lib/winston/config');

dotenv.config();

// Import Functions
const { File, Console } = transports;

// Init Logger
const logger = createLogger({
    level: 'info',
});

if(process.env.NODE_ENV === 'test'){
    const fileFormat = format.combine(
        format.timestamp(),
        format.json(),
    );
    const infoTransport = new File({
        level: 'info',
        filename: './info.log',
        format: fileFormat,
    });
    const errTransport = new File({
        level: 'error',
        filename: './error.log',
        format: fileFormat,
    });
    logger.add(errTransport);
    logger.add(infoTransport);
}

module.exports = logger;