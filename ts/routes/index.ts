import * as express from 'express'

export class Router {

    app: express.Express
    env: any
    constructor(app, environment){
        this.app = app
        this.env = environment
    }

    init() {
        require('./status')(this.app, this.env);
        // require('./auth')(this.app, this.env);
        // require('./user')(this.app, this.env);
    }
}