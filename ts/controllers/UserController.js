import bcrypt from 'bcrypt-nodejs';

import UserModel from './../models/UserModel'
import logger from './../_config/logger'

const _hashPassword = function(password){
    let salt = bcrypt.genSaltSync(9);
    let hash = bcrypt.hashSync(password, salt);

    return hash;
}

export class UserController {
    
    users = async function(id){
        return new Promise( (resolve, reject) => {
            if(id) {
                UserModel.findOne({_id: id})
                    .then( user => {
                        user.password = null;
                        resolve({user})
                    })
                    .catch( () => reject({
                        status: 404,
                        errors: [{ 
                            field: ['id'],
                            messages: ['Usuário não encontrado']
                        }]
                    })
                )
            }
            else{
                UserModel.find()
                    .then( users_full => {
                        let users = users_full.map(user => {
                            user.password = null;
                            return user;
                        })
                        resolve({users})
                    })
                    .catch( (error) => {
                        logger.error(`${error.name}: ${error.message}`)
                        reject({
                            status: 500, 
                            errors: "Erro de servidor interno" 
                        })
                    })
            }
        })
    }

    register = async function(user){
        return new Promise( (resolve, reject) => {
            let date = new Date();
            let dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
            user = { ...user, registration: dateNow, lastupdate: dateNow};

            UserModel.findOne({email: user.email})
                .then( user => {
                    reject({
                        status: 409,
                        errors: [{ 
                            field: ['email'],
                            messages: [`E-mail (${user.email}) já está em uso`]
                        }]
                    })
                })
                .catch( () => {
                    let password = _hashPassword(user.password)
                    user = {...user, password}

                    let insert = new UserModel(user)
                    insert.save()
                        .then( result => resolve({ 'id': result._id }) )
                        .catch( error => {
                            logger.error(`${error.name}: ${error.message}`)
                            reject({ 
                                status: 500,
                                errors: "Erro de servidor interno" 
                            })
                        })
                })
        })
    }

    update = async function(user){
        return new Promise( (resolve, reject) => {
            UserModel.findOne({_id: user.id})
                .then( () => {
                    let id = user.id;
                    delete user.id;

                    if(user.password) {
                        let password = _hashPassword(user.password);
                        user = {...user, password}; 
                    }      

                    let date = new Date();
                    let dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;  
                    user = {...user, lastupdate: dateNow};

                    UserModel.findOneAndUpdate({ _id: id }, user)
                        .then( () => resolve({success: true}) )
                        .catch( error => {
                            logger.error(`${error.name}: ${error.message}`)
                            reject({ 
                                status: 500,
                                errors: "Erro de servidor interno" 
                            })
                        })

                })
                .catch( () => reject({
                    status: 404,
                    errors: [{ 
                        field: ['id'],
                        messages: ['Usuário não encontrado']
                    }]
                }) )
        })
    }

    delete = async function(id){
        return new Promise( (resolve, reject) => {
            UserModel.findOne({_id: id})
                .then( () => {
                    UserModel.find({ _id: id }).remove()
                        .then( () => resolve({success: true}) )
                        .catch( error => {
                            logger.error(`${error.name}: ${error.message}`)
                            reject({ 
                                status: 500,
                                errors: "Erro de servidor interno" 
                            })
                        })

                })
                .catch( () => reject({
                    status: 404,
                    errors: [{ 
                        field: ['id'],
                        messages: ['Usuário não encontrado']
                    }]
                }) )
        })
    }
}