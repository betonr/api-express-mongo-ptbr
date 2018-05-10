import express from 'express';
import consign from 'consign';

const app = express();

consign()
    .include('_config/environment.js')
    .then('_server/index.js')
    .then('models')
    .then('controllers')
    .then('_server/passport.js')
    .then('policies')
    .then('routes')
    .then('_server/startClusters.js') 
    .into(app);
