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
    
    login = async function(req) {
        return new Promise( (resolve, reject) => {
            let {email,password} = req.body;

            UserModel.findOne({ email, status: true })
                .then( user => {
                    if(user != null) {
                        _isPassword(user, password)
                            .catch(error => reject({'error': error, status: 500}))
                            .then( () => {
                                user.password = null
                                resolve({
                                    me: user, 
                                    token: _generateToken({
                                        _id: user._id,
                                        email: user.email,
                                        level: user.level
                                    }), 
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
                        reject({'error': response, status: 401})
                    }
                    
                }).catch( err => {
                    reject({'error': err, status: 500})
                })  
        })
    }

}