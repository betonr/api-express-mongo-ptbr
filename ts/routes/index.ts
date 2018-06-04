import * as express from 'express'

import Status from './status'
import Auth from './auth'
import User from './user'

export class Router {

    app: express.Express
    env: any
    constructor(app, environment){
        this.app = app
        this.env = environment
    }

    init() {
        Status(this.app, this.env)
        Auth(this.app, this.env)
        User(this.app, this.env)
    }
}