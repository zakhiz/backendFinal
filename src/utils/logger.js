import winston from "winston";

const customLevelsConfig = { 
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
}

export default winston.createLogger({
    levels: customLevelsConfig,
    transports: [ 
        new winston.transports.Console({ 
            level: "info" 
        }),
        
        new winston.transports.File({ 
            level: "warn",
            filename: "./logs/warn.log"
        }),

        new winston.transports.File({
            level: "error",
            filename: "./logs/error.log"
        }),

        new winston.transports.File({
            level: "fatal",
            filename: "./logs/fatal.log"
        })
    ]
})
