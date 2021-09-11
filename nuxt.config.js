import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Audiophile - %s',
    title: 'Audiophile',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  styleResources: {
    scss: [
      '~/assets/scss/variables.scss',
      '~/styles/mixins.scss',
      '~/styles/import.scss',
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/global.js',
    '~/plugins/composition-api.js',
    '~/plugins/rich-text-renderer.js',
    { src: '~/plugins/vuex-persist', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/svg',
    'nuxt-route-meta',
    '@nuxt/image',
    [
      'storyblok-nuxt',
      {
        accessToken: 'ol47Ce94XpLASv7QFjKX3Qtt',
        cacheProvider: 'memory',
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/netlify-files',
    ['@nuxtjs/dotenv', { filename: '.env' }],
    '@nuxtjs/dayjs',
  ],

  loading: {
    color: '#d87d4a',
    height: '1px',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8888/.netlify/functions/'
        : '/.netlify/functions/',
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  image: {
    staticFilename: '[publicPath]/images/[name]-[hash][ext]',
    dir: 'static/images',
    provider: 'storyblok',
    storyblok: {
      baseURL: 'https://img2.storyblok.com',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: false,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.lighten3,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          black: '#000000',
          orange: '#d87d4a',
        },
      },
    },
  },

  router: {
    base: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: {
      optimization: {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.(css|vue)$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      },
    },
  },
}
