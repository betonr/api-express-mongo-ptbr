import validate from 'express-validation'

import policiesAuth from './../policies/auth'
import { AuthController } from './../controllers/AuthController'

module.exports = (app, environment) => {

    const Auth = new AuthController()

    app.post(environment.pathBase+"/auth/login",
        validate(policiesAuth.login), 
        Auth.login);  

}