import cluster from "cluster"
import os from "os"

import createServer from "../_config/createServer"
import logger from "../_config/logger"

module.exports = app => {

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
      createServer(app)
    }  

  } else {
    createServer(app)
  }

}