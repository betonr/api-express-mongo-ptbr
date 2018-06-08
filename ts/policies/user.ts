import * as joi from 'joi'

export default {
    register: {
        body: {
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().regex(/[a-zA-Z0-9]{8,30}/).options({
                language: {
                  string: {
                    regex: {
                      base: 'A senha precisa ter no mínimo 8 caracteres entre números e letras'
                    }
                  }
                }
            })
        }
    },
    update: {
        body: {
            id: joi.required(),
            name: joi.string(),
            email: joi.string().email(),
            password: joi.string().regex(/[a-zA-Z0-9]{8,30}/).options({
                language: {
                  string: {
                    regex: {
                      base: 'A senha precisa ter no mínimo 8 caracteres entre números e letras'
                    }
                  }
                }
            }),
            status: joi.number().integer()
        }
    },
    delete: {
        params:{
            id: joi.required()
        }
    },
    select: {
        params:{
            id:joi.required()
        }
    }
}