const path = require("path");
const BrotliGzipPlugin = require("brotli-gzip-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "/src/index.jsx"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/public/dist")
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new BrotliGzipPlugin({
      asset: "[path].br[query]",
      algorithm: "brotli",
      test: /\.(js|jsx|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
      quality: 11
    }),
    new BrotliGzipPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|jsx|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
