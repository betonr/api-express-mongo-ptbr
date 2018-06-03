module.exports = {
  apps : [{
    name   : "api",
    script : "./dist/main.js",
    instance: 1,
    exec_mode: "fork",
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
