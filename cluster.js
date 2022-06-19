const os = require('os')
const cluster = require('cluster')

if (cluster.isMaster) {
  const numberOfCpus = os.cpus().length - 2
  console.info(`Master ${process.pid} is running`)
  console.info(`Forking Server for ${numberOfCpus} CPUs\n`)

  // Create a Worker Process for each Available CPU
  for (let index = 0; index < numberOfCpus; index++) {
    cluster.fork()
  }

  // When Worker process has died, Log the worker
  cluster.on('exit', (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.info(`Worker ${worker.process.pid} died`)
      cluster.fork()
    }
  })
} else {
  // if Worker process, master is false, cluster.isWorker is true
  // worker starts server for individual cpus
  // the worker created above is starting server
  require('./index')
}
