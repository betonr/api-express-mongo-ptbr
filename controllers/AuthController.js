import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'

import UserModel from './../models/UserModel'
import logger from './../_config/logger'
import environment from './../_config/environment'

const _isPassword = (user, password) => {
    return new Promise((resolve, reject) => {
        if(bcrypt.compareSync(password, user.password)) resolve();
        else reject({errors: [{
                field: ['password'],
                messages: ['Senha incorreta!']
            }]
        })
    });
}

const _generateToken = (user) => {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign({user}, environment.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

export class AuthController {
    
    login(req, res) {
        let {email,password} = req.body;

        UserModel.findOne({ email, status: true })
            .then( user => {
                if(user != null) {
                    _isPassword(user, password)
                        .catch( error => {
                            res.status(401).send(error)
                        })
                        .then( () => {
                            user.password = null
                            res.status(202).send({
                                me: user, 
                                token: _generateToken(user), 
                                messsage: 'Autorizado com sucesso'
                            })
                        })                  
                
                //USER - NOT FOUND OR INACTIVE
                } else{
                    let response = {
                        errors: [
                            {
                                field: ['email','status'],
                                messages: ['Usuário não encontrado ou inativo']
                            }
                        ]                   
                    }
                    res.status(401).send({ errors: response.errors })
                }
                
            }).catch( err => {
                logger.error(`${err.name}: ${err.message}`)
                res.status(500).send({ error: "Erro de servidor interno" })
            })
    }

}