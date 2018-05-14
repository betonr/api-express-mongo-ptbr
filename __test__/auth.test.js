import 'jest'
import request from 'supertest'

import environment from './../_config/environment'

let address = global.address+environment.pathBase;

test('post /auth/login - not found', () => {
    return request(address)
        .post('/auth/login')
        .send({
            email: 'usuario1@email.com',
            password: 'teste1515'
          })
        .then( response => {
            expect(response.status).toBe(401)
            expect(response.body.errors[0].field).toEqual(['email','status'])
        }).catch(fail)
})

// test('post /auth/login - error password', () => {
//     return request(address)
//         .post('/auth/login')
//         .send({
//             email: 'admin@test.com.br',
//             password: 'admintst235'
//         })
//         .then( response => {
//             expect(response.status).toBe(401)
//             expect(response.body.errors[0].field).toEqual(['password'])
//         }).catch(fail) 
// })
