const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = env => {
  const mode = env.development ? 'development' : 'production'
  return {
    mode,
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.join(__dirname, 'public', 'js'),
      publicPath: path.join('public', 'js'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
    },
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }, {
        test: /\.(s)css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }, {
          loader: 'sass-loader'
        }]
      }]
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      writeToDisk: true,
      historyApiFallback: true,
      open: true
    },
    plugins: [
      new CleanWebpackPlugin(),
    ]
  }
}
