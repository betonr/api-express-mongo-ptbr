import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';

import UserModel from './../models/UserModel'

module.exports = (app, environment) => {

    let params = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: environment.authentication.jwtSecret
    }

    const strategy = new Strategy(params, (jwtPayload, done) => {
        UserModel.findOne({_id: jwtPayload.user.id})
            .then( user => done(null, {
                _id: user._id,
                email: user.email,
                level: user.level
              }) 
            )
            .catch( error => done(error, null) );
    });

    passport.use(strategy);
    
    app.use(passport.initialize());
}