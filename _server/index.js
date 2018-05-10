import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'

import logger from '../_config/logger'
import connectionDB from '../_config/connectionDB'

module.exports = app => {

    app.use(morgan("common", {
      skip: (req, res) => res.statusCode >= 400,
      stream: {
        write: (msg) => {
          logger.info(msg)
        }
      }
    }))

    app.use(morgan("common", {
      skip: (req, res) => res.statusCode < 400,
      stream: {
        write: (msg) => {
          logger.error(msg)
        }
      }
    }))
  
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    connectionDB(app)
      .catch( err => {
        logger.error('Erro ao conectar com o banco de dados = ' + err)
        process.exit(0)
      });

    app.use(cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"]
    }));

    app.use(helmet());

}
