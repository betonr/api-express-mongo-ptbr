import * as express from 'express'
import * as passport from 'passport'
import {Strategy, ExtractJwt} from 'passport-jwt'

import UserModel from './../models/UserModel'

export class Passport {

    app: express.Express
    env: any
    constructor(app, environment) {
        this.app = app
        this.env = environment
    }

    auth(): void {
        let params = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.env.authentication.jwtSecret
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

        (<any>passport).use(strategy);
        this.app.use((<any>passport).initialize());
    }
}