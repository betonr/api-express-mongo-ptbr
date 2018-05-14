import 'jest'
import request from 'supertest'

import environment from './../_config/environment'

let address = global.address+environment.pathBase;

test('get / - status', () => {
    return request(address)
        .get('/')
        .then( response => {
            expect(response.status).toBe(200)
            expect(response.body.status).not.toBeUndefined()
        }).catch(fail)
})
