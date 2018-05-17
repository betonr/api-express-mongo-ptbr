import validate from 'express-validation'

import policiesAuth from './../policies/auth'
import { AuthController } from './../controllers/AuthController'

module.exports = (app, environment) => {

    const Auth = new AuthController()

    app.post(environment.pathBase+"/auth/login",
        validate(policiesAuth.login), 
        (req, res) => Auth.login(req)
            .then(response => res.status(202).send(response) )
            .catch( error => {
                if(error.status < 500) res.status(error.status).send(error.error)
                else {
                    logger.error(`${error.error.name}: ${error.error.message}`)
                    res.status(500).send({ error: "Erro interno no servidor" }) 
                }
            })
    );  
}