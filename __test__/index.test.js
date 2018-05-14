import 'jest'
import request from 'supertest'
import mongoose from 'mongoose'

import { Server } from './../_server/index'
import environment from './../_config/environment'

let server;
let address;
beforeAll( () => {
    environment.db.database = process.env.DB_NAME || 'db-api-test'
    environment.port = process.env.PORT || 3001
    address = `http://localhost:${environment.port}${environment.pathBase}`
    
    server = new Server()
    return server.start()
            .catch( console.error )
})

test('get / - status', () => {
    return request(address)
        .get('/')
        .then( response => {
            expect(response.status).toBe(200)
            expect(response.body.status).not.toBeUndefined()
        }).catch(fail)
})

afterAll( () => {
    return server.shutdown()
})