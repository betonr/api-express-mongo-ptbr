import Joi from 'joi';

module.exports = {
    register: {
        body: {
            name: Joi.string().regex(/[a-zA-Z]/).required(),
            lastname: Joi.string().regex(/[a-zA-Z]/).required(),
            email: Joi.string().email().required(),
            level: Joi.number().integer().required(),
            password: Joi.string().regex(/[a-zA-Z0-9]{8,30}/).options({
                language: {
                  string: {
                    regex: {
                      base: 'A senha precisa ter no mínimo 8 caracteres entre números e letras'
                    }
                  }
                }
            }).required(),
            status: Joi.number().integer()
        }
    },
    update: {
        body: {
            id: Joi.required(),
            name: Joi.string().regex(/[a-zA-Z]/),
            lastname: Joi.string().regex(/[a-zA-Z]/),
            email: Joi.string().email(),
            level: Joi.number().integer(),
            password: Joi.string().regex(/[a-zA-Z0-9]{8,30}/).options({
                language: {
                  string: {
                    regex: {
                      base: 'A senha precisa ter no mínimo 8 caracteres entre números e letras'
                    }
                  }
                }
            }),
            status: Joi.number().integer()
        }
    },
    delete: {
        params:{
            id: Joi.required()
        }
    },
    select: {
        params:{
            id:Joi.required()
        }
    }
};