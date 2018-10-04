// const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev) =>{
{        return {
            preserveWhitespace: true,         
            extractCSS: !isDev,
            cssModules: {
                localIdentName: '[path][name]-[local]-[hash:base64:5]',
                camelCase: true,
            },
            // hotReload
        }}
}
