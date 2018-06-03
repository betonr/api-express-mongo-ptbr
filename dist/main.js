"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./_config/index");
const environment_1 = require("./_config/environment");
const logger_1 = require("./_config/logger");
const server = new index_1.Server();
const logger = new logger_1.Logger().logs();
server.start()
    .then(server => {
    logger.info(`${environment_1.environment.name} rodando com sucesso - porta ${environment_1.environment.port}`);
}).catch(error => {
    logger.error('Falha ao iniciar: ' + error);
    process.exit(1);
});
