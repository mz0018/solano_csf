module.exports = {
  apps: [
    {
      name: 'solano-csf-backend',
      script: './server.js',
      cwd: '/var/www/solano_csf/backend',

      instances: 1,
      exec_mode: 'fork',

      autorestart: true,
      watch: false,

      max_memory_restart: '500M'
    }
  ]
}