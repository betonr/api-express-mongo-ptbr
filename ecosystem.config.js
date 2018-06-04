module.exports = {
  apps : [{
    name   : "api",
    script : "./dist/main.js",
    instance: 0,
    exec_mode: "cluster",
    watch: true,
    merge_logs: true,
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
