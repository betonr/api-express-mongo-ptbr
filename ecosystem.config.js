module.exports = {
  apps : [{
    name   : "api",
    exec_interpreter: "babel-node",
    script : "./main.js",
    instance: 0,
    exec_mode: "fork",
    watch: true,
    env: {
      PORT: 3000,
      NODE_ENV: "development"
    },
    env_production: {
      PORT: 3000,
      NODE_ENV: "production"
    }
  }]
}
