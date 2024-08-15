const config: any = {
    apps: [
        {
            name: 'burger_bot_server',
            script: './build/index.ts', // Ensure that TypeScript files are supported
            exec_mode: 'cluster', // Use cluster mode for scaling
            instances: 'max', // Automatically scale based on the number of CPUs

            max_memory_restart: '300M', // Restart if memory exceeds this limit

            // Logging
            out_file: './burger_bot_server_out.log',
            error_file: './burger_bot_server_error.log',
            time: true,
            log_date_format: 'HH:mm:ss', // Log date format

            watch: true, // Enable file watching for changes
            ignore_watch: [
                './node_modules',
                './.DS_Store',
                './package.json',
                './yarn.lock',
                '*.log',
                '*.txt',
                'newBot-out.log',
                'newBot-error.log',
            ],

            // Env Specific Config
            env: {
                NODE_ENV: 'dev', // Default environment
            },
            env_prod: {
                NODE_ENV: 'prod',
            },
            env_dev: {
                NODE_ENV: 'dev',
            },
        },
    ],
};

export = config;