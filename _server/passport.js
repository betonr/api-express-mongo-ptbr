import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';

module.exports = app => {

    const config = app._config.environment.authentication;
    const userModel = new app.models.UserModel;

    let params = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret
    }

    const strategy = new Strategy(params, (jwtPayload, done) => {
        userModel.findOne({_id: jwtPayload.user.id})
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