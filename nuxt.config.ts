// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      title: 'My Nuxt App',
      meta: [
        { name: 'description', content: 'A simple Nuxt app deployed on AWS EC2' }
      ]
    }
  },
  nitro: {
    publicAssets: [
      {
        dir: 'public',   // ✅ Tell Nuxt to serve everything under /public
        maxAge: 3600,    // Cache for 1 hour (optional)
      },
    ],
  },
})
