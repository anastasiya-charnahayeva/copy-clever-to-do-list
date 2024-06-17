const separatedChunks = ['@firebase'];
const ONE_DAY = 60 * 60 * 24 * 1000;
const ONE_WEEK = ONE_DAY * 7;
export default defineNuxtConfig({
  ssr: true,
  devtools: { 
    enabled: true, 
    timeline: {
        enabled: true
    }
  },
  css: ['~/assets/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@pinia/nuxt',
  ],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  runtimeConfig: {
      serviceAccount: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      public: {
          appName: 'copy-clever-to-do-list',
          authCookieName: "__session",
          authCookieExpires: parseInt(ONE_WEEK.toString(), 10),
          firebase: {
              apiKey: process.env.FIREBASE_API_KEY,
              authDomain: process.env.FIREBASE_AUTH_DOMAIN,
              projectId: process.env.FIREBASE_PROJECT_ID,
              storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
              messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
              appId: process.env.FIREBASE_APP_ID,
          },
      },
  },
  nitro: {
      preset: 'firebase',
      compressPublicAssets: true,
      firebase: {
          gen: 2,
          nodeVersion: '20',
      },
  },
  typescript: {
      tsConfig: {
          compilerOptions:
              {
                  strictNullChecks: false,
                  verbatimModuleSyntax: false
              }
      }
  },
  vite: {
      build: {
          rollupOptions: {
              output: {
                  manualChunks(id: any) {
                      const separateModule = separatedChunks.find(module => id.includes(module));
                      if (separateModule) return separateModule;
                  }
              }
          },
      },
      optimizeDeps: {
          exclude: separatedChunks
      }
  },
})