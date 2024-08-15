 
const config: any = {
    apps: [
        {
            name: 'burger_bot_server',
            script: './index.js',
            max_memory_restart: '300M',
            // Logging
            out_file: './burger_bot_server_out.log',
            error_file: './burger_bot_server_error.log',
            // merge_logs: true,
            time: true,

            logDateFormat: 'HH:mm:ss',
            // log_type: 'json',

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

            // Env Specific Config
            env_prod: {
                NODE_ENV: 'prod',
                exec_mode: 'cluster',
                instances: 'max',
            },
            env_dev: {
                NODE_ENV: 'dev',
            },
        },
    ],
};

export = config;