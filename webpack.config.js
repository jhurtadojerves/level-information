const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use : {
          loader : 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  }
};
