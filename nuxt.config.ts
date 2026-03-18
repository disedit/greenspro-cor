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
  },

  image: process.env.NUXT_PUBLIC_NODE_ENV === 'production' ? {
    provider: 'netlify',
    domains: ['content.greenspro-cor.eu']
  } : {
    provider: 'ipx'
  }
})
