const path = require('path');

module.exports = {
    entry: './src/scripts/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public/dist/scripts')
    },
    
//    externals: {
//        D3: 'd3.v4.min.js'
//    }
};