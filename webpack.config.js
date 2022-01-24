/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[fullhash:8].bundle.js',
    chunkFilename: '[name].[fullhash:8].bundle.js',
    clean: true,
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
    new webpack.DefinePlugin({
      'process.env.gh_pages': JSON.stringify(process.env.gh_pages),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      hash: true,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  /*optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          vendors: {
            test: /[\\/]node_modules[\\/]/, ///< put all used node_modules modules in this chunk
            name: 'vendor', ///< name of bundle
            chunks: 'all', ///< type of code to put in this bundle
          },
        },
      },
    },
  },*/
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};
