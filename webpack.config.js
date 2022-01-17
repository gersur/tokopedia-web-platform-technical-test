/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: 'auto',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', 'sass', 'scss', 'css'],
    plugins: [
      new TsconfigPathsPlugin({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|sass|css)$/,
        include: [path.resolve(__dirname, 'src', 'styles')],
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      hash: true,
    }),
    new MomentTimezoneDataPlugin({
      startYear: 2022,
      matchCountries: 'ID',
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['id'],
    }),
  ],
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
};
