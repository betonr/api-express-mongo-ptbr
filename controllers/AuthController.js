import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'

import logger from '../_config/logger'

module.exports = app => {
    
    let collection
    const AuthController = function(){
        collection = app.models.UserModel
    }

    AuthController.prototype.login = function(req, res){
        let {email,password} = req.body;

        collection.findOne({ email, status: true })
            .then( user => {
                if(user != null) {
                    this._isPassword(user, password)
                        .catch(error => {
                            logger.error(`${error.name}: ${error.message}`)
                            res.status(500).send({ error: "Erro de servidor interno" })
                        })
                        .then( () => {
                            user.password = null
                            res.status(202).send({
                                me: user, 
                                token: this._generateToken(user), 
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
                    res.status(401).send({ error: response })
                }
                
            }).catch( err => {
                logger.error(`${err.name}: ${err.message}`)
                res.status(500).send({ error: "Erro de servidor interno" })
            })
    }

    //comparando senhas criptografadas
    AuthController.prototype._isPassword = function(user, password){
        return new Promise((resolve, reject) => {
            if(bcrypt.compareSync(password, user.password)) resolve();
            else reject({errors: [{
                    field: ['password'],
                    messages: ['Senha incorreta!']
                }]
            })
        });
    }

    AuthController.prototype._generateToken = function(user){
        const ONE_WEEK = 60 * 60 * 24 * 7;
        return jwt.sign({user}, app._config.environment.authentication.jwtSecret, {
            expiresIn: ONE_WEEK
        })
    }

    return AuthController;
}