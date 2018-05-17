'use strict'

import { Server } from './_server/index'
import environment from './_config/environment'
import logger from './_config/logger'

const server = new Server();

server.start()
    .then( server => {
        logger.info(`${environment.name} rodando com sucesso - porta ${environment.port}`)

    }).catch( error => {
        logger.error('Falha ao iniciar: '+error)
        process.exit(1)

    })

