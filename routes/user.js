import validate from 'express-validation';

import policiesUser from './../policies/user'
import policiesAuth from './../policies/auth'
import { UserController } from './../controllers/UserController'

module.exports = (app, environment) => {

    const User = new UserController()

    app.get(environment.pathBase+"/user/:id",
        validate(policiesUser.select),
        User.users)
        .get(environment.pathBase+"/users/",
        User.users);

    app.post(environment.pathBase+"/user/register",
        validate(policiesUser.register),
        User.register);

    app.put(environment.pathBase+"/user/update",
        // policiesAuth.authentication,
        // policiesAuth.isAdmin,
        validate(policiesUser.update),
        User.update);

    app.delete(environment.pathBase+"/user/delete/:id",
        // policiesAuth.authentication,
        // policiesAuth.isAdmin,
        validate(policiesUser.delete),
        User.delete);

}