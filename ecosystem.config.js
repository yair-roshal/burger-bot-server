module.exports = {
  apps: [
    {
      name: "burger_01",

      script: 'server/server.ts',
      exec_mode: 'fork',
      cwd: './server',
      interpreter: 'node',
      interpreter_args: '--require ts-node/register --require tsconfig-paths/register',


      exec_mode: "cluster", // Используем кластерный режим для масштабирования
      instances: "max", // Автоматическое масштабирование на основе количества CPU
      max_memory_restart: "300M", // Перезапуск, если память превышает этот лимит

      // Логирование
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      merge_logs: true,
      time: true,
      log_date_format: "HH:mm:ss", // Формат даты в логах

      watch: true, // Включаем отслеживание изменений файлов
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

      // Конфигурация окружений
      env: {
        NODE_ENV: "dev", // По умолчанию
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