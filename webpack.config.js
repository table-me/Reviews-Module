const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public/dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }]
      }
    ]
  }
};

//   {
//     test: /\.(png|svg|jpg|gif)$/,
//     use: ['file-loader']
//   },
