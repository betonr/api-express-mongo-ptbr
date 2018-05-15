import 'jest'
import request from 'supertest'

import environment from './../_config/environment'

let address = global.address+environment.pathBase;

let idUser;
let token;

describe('user controller', () => {

    beforeAll( () => request(address)
            .post('/auth/login')
            .send({
                email: 'admin@tests.com.br',
                password: 'admintst235'
            })
            .then( response => {
                token = response.body.token
            })
        )

    test('post /user/register - register success', () => {
        return request(address)
            .post('/user/register')
            .send({
                email: 'admin@test.com.br',
                password: 'admintst235',
                name: 'admin',
                lastname: 'teste',
                level: 3
            })
            .then( response => {
                idUser = response.body.id
                expect(response.status).toBe(201)
                expect(response.body.errors).not.toBeDefined()            
                expect(response.body.id).toBeDefined()
            }).catch(fail)
    })

    test('post /user/register - register email duplicated', () => {
        return request(address)
            .post('/user/register')
            .send({
                email: 'admin@test.com.br',
                password: 'admintst23s5',
                name: 'admin 2',
                lastname: 'teste 2',
                level: 2
            })
            .then( response => {
                expect(response.status).toBe(409)
                expect(response.body.errors[0].field[0]).toBe('email')            
                expect(response.body.id).not.toBeDefined()
            }).catch(fail)
    })

    test('post /user/register - incomplete data', () => {
        return request(address)
            .post('/user/register')
            .send({
                password: 'admintst23s5',
                name: 'admin 3',
                level: 1
            })
            .then( response => {
                expect(response.status).toBe(400)
                expect(response.body.errors).toBeInstanceOf(Array)
                expect(response.body.id).not.toBeDefined()
            }).catch(fail)
    })

    test('get /users ', () => {
        return request(address)
            .get('/users')
            .then( response => {
                expect(response.status).toBe(200)
                expect(response.body.errors).not.toBeDefined()            
                expect(response.body.users).toBeInstanceOf(Array)
            }).catch(fail)
    })

    test('get /user/:id - not found', () => {
        return request(address)
            .get('/user/151')
            .then( response => {
                expect(response.status).toBe(404)
                expect(response.body.errors[0].field[0]).toBe('id')            
                expect(response.body.user).not.toBeDefined() 
            }).catch(fail)
    })

    test('get /user/:id - get success', () => {
        return request(address)
            .get('/user/'+idUser)
            .then( response => {
                expect(response.status).toBe(200)
                expect(response.body.errors).not.toBeDefined()            
                expect(response.body.user._id).toBeDefined() 
                expect(response.body.user.password).toBe(null) 
            }).catch(fail)
    })

    test('post /user/update - user not found', () => {
        return request(address)
            .put('/user/update')
            .send({
                id: '1515',
                email: 'admin@tests.com.br',
                password: 'admintst23s5',
                name: 'admin 22',
                lastname: 'teste 22',
                level: 2
            })
            .then( response => {
                expect(response.status).toBe(404)
                expect(response.body.errors).toBeInstanceOf(Array)
                expect(response.body.success).not.toBeDefined()
            }).catch(fail)
    })

    test('post /user/update - update success', () => {
        return request(address)
            .put('/user/update')
            .send({
                id: idUser,
                email: 'admin@testss.com.br',
                password: 'admintt23s5',
                name: 'admin 25',
                lastname: 'teste 25',
                level: 3
            })
            .then( response => {
                expect(response.status).toBe(202)
                expect(response.body.errors).not.toBeDefined()
                expect(response.body.success).toBeTruthy()
            }).catch(fail)
    })

    test('post /user/delete/:id - user not found', () => {
        return request(address)
            .delete('/user/delete/15151')
            .then( response => {
                expect(response.status).toBe(404)
                expect(response.body.errors).toBeInstanceOf(Array)
                expect(response.body.success).not.toBeDefined()
            }).catch(fail)
    })

    test('post /user/delete/:id - delete success', () => {
        return request(address)
            .delete('/user/delete/'+idUser)
            .then( response => {
                expect(response.status).toBe(202)
                expect(response.body.errors).not.toBeDefined()
                expect(response.body.success).toBeTruthy()
            }).catch(fail)
    })

});