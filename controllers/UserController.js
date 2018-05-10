import bcrypt from 'bcrypt-nodejs';

import logger from '../_config/logger'

module.exports = (app) => {
    
    let collection;
    const UserController = function(){
        collection = app.models.UserModel
    }

    UserController.prototype.users = function(req, res){
        let id = req.params.id ? req.params.id : false;

        if(id) {
            collection.findOne({_id: id})
                .then( (user) => {
                    user.password = null;
                    res.send({user})
                })
                .catch( () => res.status(404).send({
                    errors: [{ 
                        field: ['id'],
                        message: ['Usuário não encontrado']
                    }]
                }) 
            );
        }
        else{
            collection.find()
                .then( users_full => {
                    let users = users_full.map(user => {
                        user.password = null;
                        return user;
                    })
                    res.send({users})
                })
                .catch( (error) => {
                    logger.error(`${error.name}: ${error.message}`)
                    res.status(500).send({ error: "Erro de servidor interno" })
                })
        }
    }

    UserController.prototype.register = function(req, res){
        let user = req.body;
        let date = new Date();
        let dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        user = { ...user, registration: dateNow, lastupdate: dateNow};

        collection.findOne({email: user.email})
            .then( user => {
                res.status(409).send({
                    errors: [{ 
                        field: ['email'],
                        message: [`E-mail (${user.email}) já está em uso`]
                    }]
                })
            })
            .catch( () => {
                let password = this.hashPassword(user.password)
                user = {...user, password}

                let insert = new collection(user)
                insert.save()
                    .then( result => res.status(201).send({ 'id': result.id }) )
                    .catch( error => {
                        logger.error(`${error.name}: ${error.message}`)
                        res.status(500).send({ error: "Erro de servidor interno" })
                    })
            });
    }

    UserController.prototype.update = function(req, res){
        let user = req.body;

        collection.findOne({_id: user.id})
            .then( () => {
                let id = user.id;
                delete user.id;

                if(user.password) {
                    let password = this.hashPassword(user.password);
                    user = {...user, password}; 
                }      

                let date = new Date();
                let dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;  
                user = {...user, lastupdate: dateNow};

                collection.findOneAndUpdate({ _id: id }, user)
                    .then( () => res.status(202).send({success: true}) )
                    .catch( error => {
                        logger.error(`${error.name}: ${error.message}`)
                        res.status(500).send({ error: "Erro de servidor interno" })
                    })

            })
            .catch( () => res.status(404).send({
                errors: [{ 
                    field: ['id'],
                    message: ['Usuário não encontrado']
                }]
            }) );
    }

    UserController.prototype.delete = function(req, res){
        let id = req.params.id;
        
        collection.findOne({_id: id})
            .then( () => {
                collection.find({ _id: id }).remove()
                    .then( () => res.status(202).send({success: true}) )
                    .catch( error => {
                        logger.error(`${error.name}: ${error.message}`)
                        res.status(500).send({ error: "Erro de servidor interno" })
                    })

            })
            .catch( () => res.status(404).send({
                errors: [{ 
                    field: ['id'],
                    message: ['Usuário não encontrado']
                }]
            }) );
    }

    UserController.prototype.hashPassword = function(password){
        let salt = bcrypt.genSaltSync(9);
        let hash = bcrypt.hashSync(password, salt);

        return hash;
    }

    return UserController;
}