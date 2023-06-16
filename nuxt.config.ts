// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // imports: {
  //   dirs: ['stores'],
  // },
  // modules: [
  //   [
  //     '@pinia/nuxt',
  //     {
  //       autoImports: ['defineStore', 'acceptHMRUpdate'],
  //     },
  //   ]
  // ],
})
