module.exports = {
  publicPath: `/${process.env.VUE_APP_SERVER_ID}/`,
  productionSourceMap: false,
  pwa: {
    name: 'Мир TF',
    themeColor: '#424242',
    manifestOptions: {
      start_url: `https://www.tfapps.ru/${process.env.VUE_APP_SERVER_ID}/`
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/index.html',
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('/'),
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 20,
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 5,
              maxAgeSeconds: 60
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    appleMobileWebAppCapable: 'yes'
  }
}
