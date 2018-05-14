import cluster from 'cluster'
import os from 'os'

import { Server } from './_server/index'
import environment from './_config/environment'
import logger from './_config/logger'

const server = new Server();

const exec = () => {
    server.start()
        .then( server => {
            logger.info(`${environment.name} rodando com sucesso - porta ${environment.port}`)

        }).catch( error => {
            logger.error('Falha ao iniciar: '+error)
            process.exit(1)

        })
}

if (process.env.NODE_ENV == "production") {
    
    const CPUS = os.cpus()
    if (cluster.isMaster) {

        CPUS.forEach( () => cluster.fork() )

        cluster.on("listening", worker => {
            logger.info(`Cluster pid - ${worker.process.pid} conectado`);
        });
        cluster.on("disconnect", worker => {
            logger.error(`Cluster pid - ${worker.process.pid} desconectado`);
        });
        cluster.on("exit", function(worker)  {
            logger.error(`Cluster pid - ${worker.process.pid} finalizou`);
            cluster.fork();
        });

    } else {
      //slave 
      exec()
    }  

} else {
    exec()
}

