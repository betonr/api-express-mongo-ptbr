import * as bcrypt from 'bcrypt-nodejs'

import UserModel from './../models/UserModel'

export class UserController {

    env: any
    constructor(environment) {
        this.env = environment
    }

    private hashPassword(password): IDBFactory{
        let salt = bcrypt.genSaltSync(9);
        let hash = bcrypt.hashSync(password, salt);
    
        return hash;
    }
    
    users(id): Promise<any>{
        return new Promise( (resolve, reject) => {
            if(id) {
                UserModel.findOne({_id: id, profiles: ['user']})
                    .then( user => {
                        user = user.toObject()
                        delete user.password
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
            } else {
                UserModel.find({profiles: ['user']})
                    .then( users_full => {
                        let users = users_full.map(user => {
                            user = user.toObject()
                            delete user.password
                            return user;
                        })
                        resolve({users})
                    })
                    .catch( (error) => {
                        reject({
                            status: 500, 
                            errors: "Erro de servidor interno" 
                        })
                    })
            }
        })
    }

    register(user): Promise<any>{
        return new Promise( (resolve, reject) => {

            UserModel.findOne({email: user.email})
                .then( userFind => {
                    if(userFind !== null && userFind.toObject().status == true) {
                        reject({
                            status: 409,
                            errors: [{ 
                                field: ['email'],
                                messages: [`O E-mail (${userFind.email})`]
                            }]
                        })  
                    } else {
                        if(userFind !== null && userFind.toObject().status == false) {
                            UserModel.remove({ _id: userFind.toObject()._id }).exec()
                        }
                    
                        let password = ''
                        userFind = {...userFind, password, profiles: ['user']}

                        let insert = new UserModel(userFind)
                        insert.save()
                            .then( result => resolve({ 'id': result._id }) )
                            .catch( error => {
                                reject({ 
                                    status: 500,
                                    errors: "Erro de servidor interno" 
                                })
                            })
                    }
                })
        })
    }

    update(user): Promise<any>{
        return new Promise( (resolve, reject) => {
            UserModel.findOne({_id: user.id})
                .then( () => {
                    let id = user.id;
                    delete user.id;

                    if(user.password) {
                        let password = this.hashPassword(user.password);
                        user = {...user, password}; 
                    }

                    UserModel.findOneAndUpdate({ _id: id }, user)
                        .then( () => resolve({success: true}) )
                        .catch( error => {
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

    delete(id): Promise<any>{
        return new Promise( (resolve, reject) => {
            UserModel.findOne({_id: id, profiles: ['user']})
                .then( user => {
                    user.remove()
                        .then( _ => resolve({success: true}) )
                        .catch( _ => {
                            reject({ 
                                status: 500,
                                errors: "Erro de servidor interno" 
                            })
                        })

                })
                .catch( _ => reject({
                    status: 404,
                    errors: [{ 
                        field: ['id'],
                        messages: ['Usuário não encontrado']
                    }]
                }) )
        })
    }
}