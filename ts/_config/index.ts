import * as express from 'express'
import * as mongoose from 'mongoose'

import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as helmet from 'helmet'
import * as http from 'http'
import * as morgan from 'morgan'
import * as https from 'https'
import * as fs from 'fs'

import { Logger } from './logger'
import { environment } from './environment'
import { Passport } from './passport';
import { Router } from './../routes/index'

export class Server {

    app: express.Express
    server: any
    logger: any
    passport: Passport
    router: Router

    constructor() {
        this.app = express()
        this.server = null
        this.logger = new Logger().logs()
        this.passport = new Passport(this.app, environment)
        this.router = new Router(this.app, environment)
    }

    initDB(): Promise<mongoose.Mongoose> {
        (<any>mongoose).Promise = global.Promise
        
        let cn: string;
        if(process.env.NODE_ENV && process.env.NODE_ENV=="production"){
            cn = process.env.DB_URL ? process.env.DB_URL : 
                `mongodb://${environment.db.user}:${environment.db.password}@${environment.db.options.host}:${environment.db.options.port}/${environment.db.database}`
        } else{
            cn = process.env.DB_URL ? process.env.DB_URL : 
                `mongodb://localhost:27017/${environment.db.database}`
        }
        return mongoose.connect(cn)
    }

    initConfig(): Promise<any> {
        return new Promise( (resolve, reject) => {
            try {
                this.app.use(morgan("common", {
                    skip: (req, res) => res.statusCode >= 400 || process.env.NODE_ENV == 'test',
                    stream: {
                        write: (msg) => {
                            this.logger.info(msg)
                        }
                    }
                }))
            
                this.app.use(morgan("common", {
                    skip: (req, res) => res.statusCode < 400 || process.env.NODE_ENV == 'test',
                    stream: {
                        write: (msg) => {
                            this.logger.error(msg)
                        }
                    }
                }))
                  
                this.app.use(bodyParser.urlencoded({ extended: true }))
                this.app.use(bodyParser.json())

                this.app.use(cors({
                    origin: "*",
                    methods: ["GET", "POST", "PUT", "DELETE"],
                    allowedHeaders: ["Content-Type", "Authorization"]
                }))

                this.app.use(helmet())
                this.passport.auth()
                this.router.init()
                resolve()

            } catch(error) {
                reject(error)
            }
        })
    }

    initServer(): Promise<any> {
        return new Promise( (resolve, reject) => {
            if(environment.authentication.enableHTTPS) {
                const credentials = {
                    key: fs.readFileSync(environment.authentication.certificate, "utf8"),
                    cert: fs.readFileSync(environment.authentication.certificate, "utf8")
                }
                this.server = https.createServer(credentials, this.app)
            } else{
                this.server = http.createServer(this.app)
            }
            this.server.listen( environment.port, () =>  resolve() )

            this.app.use(function(err, req, res, next){
                res.status(400).json(err)
                reject(err)
            });
        })
    }

    start(): Promise<Server>{
        return this.initDB()
                .then( _ => this.initConfig()
                .then( _ => this.initServer()
                .then( _ => this )))
    }

    shutdown() {
        return mongoose.disconnect()
                .then( () => this.server.close() )
    }

}