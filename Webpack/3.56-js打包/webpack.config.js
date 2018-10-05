const path = require('path')
const webpack = require('webpack')

const config = {
    entry:{
        'pagea': './src/pagea.js',
        'pageb': './src/pageb.js',
        'vendor': ['lodash']
    },

    output :{
        path:path.resolve(__dirname,'./dist'),
        filename:'[name].bundle.js',
        chunkFilename:'[name].chunk.js'
    },

    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            minChunks:2,
            chunks:['pagea','pageb']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:['vendor','manifest'],
            minChunks:Infinity
        })
    ]
}

module.exports = config