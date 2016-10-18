let path = require('path');
let config = {
    entry: path.resolve(__dirname, 'src/components/app.jsx'),
    output: {
        path: path.resolve(__dirname, 'public/assets'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, 
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
};

module.exports = config;