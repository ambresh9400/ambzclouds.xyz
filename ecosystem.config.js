module.exports = {
  apps: [
    {
      name: 'nuxt-app',
      script: 'npm',
      args: 'run start',
      env: {
        HOST: '0.0.0.0',
        PORT: 3000,
        NODE_ENV: 'production'
      }
    }
  ]
}
