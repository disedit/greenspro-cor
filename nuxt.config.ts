import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  runtimeConfig: {
    public: {
      wpApiEndpoint: 'https://content.greenspro-cor.eu/wp-json',
      contentUrl: 'https://content.greenspro-cor.eu',
      baseUrl: 'https://greenspro-cor.eu'
    }
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt'
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],

    optimizeDeps: {
      include: [
        'gsap',
        'gsap/ScrollTrigger'
      ]
    }
  },

  image: {
    provider: 'ipx',
    domains: ['content.greenspro-cor.eu'],
    ipx: {
      modifiers: {
        quality: 80
      },
      maxAge: 31556926 // 1 year
    }
  }
})
