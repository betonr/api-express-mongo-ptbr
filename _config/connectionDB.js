import mongoose from 'mongoose'
import url from 'url'

const connectionDB = (app) => {

    mongoose.Promise = global.Promise;

    let cn;

    if(process.env.NODE_ENV && process.env.NODE_ENV=="production"){
        cn = process.env.DB_URL ? process.env.DB_URL : 
            `mongodb://${app._config.environment.db.user}:${app._config.environment.db.password}@${app._config.environment.db.options.host}:${app._config.environment.db.options.port}/${app._config.environment.db.database}`
    } else{
        cn = process.env.DB_URL ? process.env.DB_URL : 
            `mongodb://localhost:27017/${app._config.environment.db.database}`
    }

    return mongoose.connect(cn)
}

module.exports = connectionDB