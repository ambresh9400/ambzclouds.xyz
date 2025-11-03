// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      title: 'My Nuxt App',
      meta: [
        { name: 'description', content: 'A simple Nuxt app deployed on AWS EC2' }
      ]
    }
  }
})
