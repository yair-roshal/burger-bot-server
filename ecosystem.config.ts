const config: any = {
    apps: [
        {
            name: 'burger_bot_server',
            script: './index.ts',
            exec_mode: 'fork', // Change to 'fork' if there are issues with clustering
            instances: 1, // Adjust instances if not using clustering

            max_memory_restart: '300M',

            // Logging
            out_file: './burger_bot_server_out.log',
            error_file: './burger_bot_server_error.log',
            time: true,
            log_date_format: 'HH:mm:ss',

            watch: true,
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

            env: {
                NODE_ENV: 'dev',
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