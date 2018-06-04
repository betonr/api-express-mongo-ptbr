module.exports = {
  apps : [{
    name   : "api",
    script : "./dist/main.js",
    instances: 0,
    exec_mode: "cluster",
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
