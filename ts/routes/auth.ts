import * as validate from 'express-validation'

import policiesAuth from './../policies/auth'
import { AuthController } from './../controllers/AuthController'

export default (app, environment): void => {

    const Auth = new AuthController(environment)

    app.post(environment.pathBase+"/auth/login",
        validate(policiesAuth.login), 
        (req, res) => Auth.login(req.body)
            .then(response => res.status(202).send(response) )
            .catch( error => res.status(error.status).send({error: error.errors}) )
    )

}