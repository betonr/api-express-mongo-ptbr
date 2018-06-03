import { Server } from './_config/index'
import { environment } from './_config/environment'
import { Logger } from './_config/logger'

const server = new Server()
const logger = new Logger().logs()

server.start()
    .then( server => {
        logger.info(`${environment.name} rodando com sucesso - porta ${environment.port}`)

    }).catch( error => {
        logger.error('Falha ao iniciar: '+error)
        process.exit(1)

    })

