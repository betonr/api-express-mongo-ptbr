import validate from 'express-validation';

import policiesUser from './../policies/user'
import policiesAuth from './../policies/auth'
import { UserController } from './../controllers/UserController'

module.exports = (app, environment) => {

    const User = new UserController()

    app.get(environment.pathBase+"/user/:id",
        validate(policiesUser.select),
        (req, res) => User.users(req.params.id)
            .then( response => res.status(200).send(response) )
            .catch( error => res.status(error.status).send({error: error.errors}) ))

    app.get(environment.pathBase+"/users/",
        (req, res) => User.users(null)
            .then( response => res.status(200).send(response) )
            .catch( error => res.status(error.status).send({error: error.errors}) ))

    app.post(environment.pathBase+"/user/register",
        validate(policiesUser.register),
        (req, res) => User.register(req.body)
            .then( response => res.status(201).send(response) )
            .catch( error => res.status(error.status).send({error: error.errors}) ))

    app.put(environment.pathBase+"/user/update",
        policiesAuth.authentication,
        policiesAuth.isAdmin,
        validate(policiesUser.update),
        (req, res) => User.update(req.body)
            .then( response => res.status(202).send(response) )
            .catch( error => res.status(error.status).send({error: error.errors}) ))

    app.delete(environment.pathBase+"/user/delete/:id",
        policiesAuth.authentication,
        policiesAuth.isAdmin,
        validate(policiesUser.delete),
        (req, res) => User.delete(req.params.id)
            .then( response => res.status(202).send(response) )
            .catch( error => res.status(error.status).send({error: error.errors}) ))

}