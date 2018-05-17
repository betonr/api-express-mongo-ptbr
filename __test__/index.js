import jestCli from 'jest-cli'
import request from 'supertest'

import { Server } from './../_server/index'
import environment from './../_config/environment'

import UserModel from './../models/UserModel'

let server;
let address = "localhost:3001"+environment.pathBase;

const beforeAllTests = () => {
  environment.db.database = process.env.DB_NAME || 'db-api-test'
  environment.port = process.env.PORT || 3001
  
  server = new Server()
  return server.start()
            .then( () => UserModel.remove({}).exec() )
            .then( () => true )
}

const afterAllTests = () => {
  return server.shutdown()
}

beforeAllTests()
    .then( () => jestCli.run() )
    .then( () => afterAllTests() )
    .catch( console.error )