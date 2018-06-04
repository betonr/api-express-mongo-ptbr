import * as joi from 'joi'
import * as passport from 'passport'

/*
 * Realiza a autenticação via passport (email e senha válidos)
 */
const authentication = function(req, res, next) {
    passport.authenticate('jwt', function (err, user) {
        if (err || !user) {
            res.status(403).send({
                error: 'Você não tem permissão para acessar esse recurso'
            })
        } else {
            req.user = user
            next()
        }
    })(req, res, next)
}

/*
 * verifica se o usuário logado é administrador (level=3)
 * ou está editando suas proprias informações
 */ 
const isAdmin = function(req, res, next) {
    if(req.user.id != req.body.id && req.user.level != 3){
        res.status(403).send({
            errors: [{ 
                field: ['_id'],
                message: ['Você precisa ser administrador']
            }]
        })
    }else{
        next();
    }
}

export default {
    login: {
        body: {
            email: joi.string().email().required(),
            password: joi.string().regex(/[a-zA-Z0-9]{8,30}/).required().options({
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
    authentication,
    isAdmin
}

