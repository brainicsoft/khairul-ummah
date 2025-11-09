/* eslint-disable no-undef */
module.exports = {
  apps: [
    {
      name: "Khairul ummah Client",
      script: "pnpm",
      args: "start",
      instances: 1,
      exec_mode: "cluster",
      listen_timeout: 10000,
      restart_delay: 10000,
      env: {
        NODE_ENV: "production",
        PORT: 3005,
      },
    },
  ],
};
