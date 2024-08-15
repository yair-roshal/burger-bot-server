const config: any = {
  apps: [
    {
      name: "burger_01",
      script: "ts-node",
      args: "-P tsconfig.json ./server/server.ts",
      exec_mode: "cluster", // Use cluster mode for scaling
      instances: "max", // Automatically scale based on the number of CPUs
      interpreter: "node", // Убедитесь, что используется Node.js

      max_memory_restart: "300M", // Restart if memory exceeds this limit

      // Logging
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      merge_logs: true,

      time: true,
      log_date_format: "HH:mm:ss", // Log date format

      watch: true, // Enable file watching for changes
      ignore_watch: [
        "./node_modules",
        "./.DS_Store",
        "./package.json",
        "./yarn.lock",
        "*.log",
        "*.txt",
        "newBot-out.log",
        "newBot-error.log",
      ],

      // Env Specific Config
      env: {
        NODE_ENV: "dev", // Default environment
      },
      env_prod: {
        NODE_ENV: "prod",
      },
      env_dev: {
        NODE_ENV: "dev",
      },
    },
  ],
}

export = config
