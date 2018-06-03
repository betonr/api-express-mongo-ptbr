"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const morgan = require("morgan");
const https = require("https");
const fs = require("fs");
const logger_1 = require("./logger");
const environment_1 = require("./environment");
const passport_1 = require("./passport");
const index_1 = require("./../routes/index");
class Server {
    constructor() {
        this.app = express();
        this.server = null;
        this.logger = new logger_1.Logger().logs();
        this.passport = new passport_1.Passport(this.app, environment_1.environment);
        this.router = new index_1.Router(this.app, environment_1.environment);
    }
    initDB() {
        mongoose.Promise = global.Promise;
        let cn;
        if (process.env.NODE_ENV && process.env.NODE_ENV == "production") {
            cn = process.env.DB_URL ? process.env.DB_URL :
                `mongodb://${environment_1.environment.db.user}:${environment_1.environment.db.password}@${environment_1.environment.db.options.host}:${environment_1.environment.db.options.port}/${environment_1.environment.db.database}`;
        }
        else {
            cn = process.env.DB_URL ? process.env.DB_URL :
                `mongodb://localhost:27017/${environment_1.environment.db.database}`;
        }
        return mongoose.connect(cn);
    }
    initConfig() {
        return new Promise((resolve, reject) => {
            try {
                this.app.use(morgan("common", {
                    skip: (req, res) => res.statusCode >= 400 || process.env.NODE_ENV == 'test',
                    stream: {
                        write: (msg) => {
                            this.logger.info(msg);
                        }
                    }
                }));
                this.app.use(morgan("common", {
                    skip: (req, res) => res.statusCode < 400 || process.env.NODE_ENV == 'test',
                    stream: {
                        write: (msg) => {
                            this.logger.error(msg);
                        }
                    }
                }));
                this.app.use(bodyParser.urlencoded({ extended: true }));
                this.app.use(bodyParser.json());
                this.app.use(cors({
                    origin: "*",
                    methods: ["GET", "POST", "PUT", "DELETE"],
                    allowedHeaders: ["Content-Type", "Authorization"]
                }));
                this.app.use(helmet());
                this.passport.auth();
                this.router.init();
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    }
    initServer() {
        return new Promise((resolve, reject) => {
            if (environment_1.environment.authentication.enableHTTPS) {
                const credentials = {
                    key: fs.readFileSync(environment_1.environment.authentication.certificate, "utf8"),
                    cert: fs.readFileSync(environment_1.environment.authentication.certificate, "utf8")
                };
                this.server = https.createServer(credentials, this.app);
            }
            else {
                this.server = http.createServer(this.app);
            }
            this.server.listen(environment_1.environment.port, () => resolve());
            this.app.use(function (err, req, res, next) {
                res.status(400).json(err);
                reject(err);
            });
        });
    }
    start() {
        return this.initDB()
            .then(_ => this.initConfig()
            .then(_ => this.initServer()
            .then(_ => this)));
    }
    shutdown() {
        return mongoose.disconnect()
            .then(() => this.server.close());
    }
}
exports.Server = Server;
