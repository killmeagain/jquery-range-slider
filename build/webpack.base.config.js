const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

module.exports = {

  externals: {
    path: PATHS,
  },

  entry: {
    app: `${PATHS.src}/index.ts`,
  },
  output: {
    filename: '[name].[hash].js',
    path: PATHS.dist,
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [{
      test: /\.ts$/,
      use: ['babel-loader', 'ts-loader'],
      exclude: /node_modules/,
    },

    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: `${PATHS.assets}fonts`,
        publicPath: '../fonts/',
      },
    },

    {
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '/',
        },
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: './postcss.config.js',
          },
        },
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
      ],
    },

    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: './postcss.config.js',
            },
          },
        },
      ],
    },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[hash].css',
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
};
