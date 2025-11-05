module.exports = {
  apps: [
    {
      name: 'nuxt-app',
      script: '.output/server/index.mjs',
      env: {
        HOST: '0.0.0.0',
        PORT: 3000,
        NODE_ENV: 'production'
      }
    }
  ]
}

