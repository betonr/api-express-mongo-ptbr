import * as winston from 'winston'
import * as fs from 'fs'

export class Logger {

    constructor() {
        if(!fs.existsSync('logs')){
            fs.mkdirSync('logs')
        }
    }

    create(): winston.Winston {
        return new (<any>winston).createLogger({
            format: (<any>winston).format.combine(
                (<any>winston).format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                (<any>winston).format.json()
            ),    
            transports: [
                new winston.transports.File({ 
                    filename: 'logs/access.log', level: 'info', maxsize: 10000000, maxFiles: 4
                }),
                new winston.transports.File({ 
                    filename: 'logs/error.log', level: 'error', maxsize: 10000000, maxFiles: 6
                })
            ]
        })
    }

    logs(): winston.Winston {
        let logger = this.create()

        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
            logger.add(new winston.transports.Console({
                format: (<any>winston).format.simple()
            }))
        }

        return logger
    }

}