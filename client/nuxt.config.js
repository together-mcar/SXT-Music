const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
console.log(`${process.env.NODE_ENV} - prod mode: ${IS_PROD}`)
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '随心听音乐',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//at.alicdn.com/t/font_1641009_hpir49u9yqu.css', as: 'style' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  css: [
    { src: '~/assets/styles/main.scss', lang: 'scss' },
    { src: 'element-ui/lib/theme-chalk/index.css' },
  ],
  // global scss
  styleResources: {
    scss: '~/assets/styles/variables.scss'
  },
  plugins: [
    '~/plugins/error-handler',
    '~/plugins/filters',
    '~/plugins/ctx-inject',
    '~/plugins/cookies.js',
    '~/plugins/nuxt-axios',
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/elementUI.js', ssr: true },
  ],
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { filename: '.env.prod' }]
  ],
  /*
   ** Router config
   */
  router: {
    middleware: ['checkRoute'],
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['element-ui']
  }
}

