
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // we deactivate the Server Side Rendering
  ssr: false,

  // Add nuxt-vuefire module
  modules: [
    'nuxt-vuefire',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  vuefire: {
    auth: true, // enable Firebase Authentication
    config: {
      apiKey: process.env.apikey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId
    },
  },
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
})