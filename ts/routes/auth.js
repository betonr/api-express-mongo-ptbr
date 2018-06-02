import validate from 'express-validation'

import policiesAuth from './../policies/auth'
import { AuthController } from './../controllers/AuthController'

module.exports = (app, environment) => {

    const Auth = new AuthController()

    app.post(environment.pathBase+"/auth/login",
        validate(policiesAuth.login), 
        (req, res) => Auth.login(req.body)
            .then(response => res.status(202).send(response) )
            .catch( error => res.status(error.status).send({error: error.errors}) )
    );  
}