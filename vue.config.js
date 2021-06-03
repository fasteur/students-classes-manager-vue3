module.exports = {
    pluginOptions: {
        i18n: {
            locale: 'fr',
            fallbackLocale: 'fr',
            localeDir: 'locales',
            enableLegacy: true,
            runtimeOnly: false,
            compositionOnly: true,
            fullInstall: true,
        },
    },
    configureWebpack: {
        devtool: 'source-map',
    },
}
