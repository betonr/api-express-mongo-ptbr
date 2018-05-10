import validate from 'express-validation';

module.exports = app => {

    const User = new app.controllers.UserController

    const path = app._config.environment.pathBase

    app.get(path+"/user/:id",
        validate(app.policies.user.select),
        User.users)
        .get(path+"/users/",
        User.users);

    app.post(path+"/user/register",
        validate(app.policies.user.register),
        User.register);

    app.put(path+"/user/update",
        app.policies.auth.authentication,
        app.policies.auth.isAdmin,
        validate(app.policies.user.update),
        User.update);

    app.delete(path+"/user/delete/:id",
        app.policies.auth.authentication,
        app.policies.auth.isAdmin,
        validate(app.policies.user.delete),
        User.delete);

}