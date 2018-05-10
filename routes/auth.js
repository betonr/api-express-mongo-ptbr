import validate from 'express-validation'
import bodyParser from 'body-parser'

module.exports = app => {

    const Auth = new app.controllers.AuthController

    const path = app._config.environment.pathBase

    app.post(path+"/auth/login",
        validate(app.policies.auth.login), 
        Auth.login);  
    
}