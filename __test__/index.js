import jestCli from 'jest-cli'
import mongoose from 'mongoose'

import { Server } from './../_server/index'
import environment from './../_config/environment'

import UserModel from './../models/UserModel'

let server;

const beforeAllTests = () => {
  environment.db.database = process.env.DB_NAME || 'db-api-test'
  environment.port = process.env.PORT || 3001
  
  server = new Server()
  return server.start()
            .then( () => UserModel.remove({}).exec() )
}

const afterAllTests = ()=>{
  return server.shutdown()
}

beforeAllTests()
    .then( () => jestCli.run() )
    .then( () => afterAllTests() )
    .catch( console.error )