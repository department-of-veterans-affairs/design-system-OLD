const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entryFiles = {
  // style: './src/sass/style.scss'
  'modal': './src/components/modals/modal.ex.jsx'
};

const baseConfig = {
  entry: entryFiles,
  output: {
    path: path.join(__dirname, `./build/generated`)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Speed up compilation.
            cacheDirectory: '.babelcache'

            // Also see .babelrc
          }
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react'],
            // Speed up compilation.
            cacheDirectory: '.babelcache'

            // Also see .babelrc
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'resolve-url-loader' },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  bourbon,
                  neat,
                  '~/uswds/src/stylesheets&sourceMap'
                ],
                sourceMap: true,
              }
            }
          ],
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: {
          loader: 'url-loader?limit=10000!img?progressive=true&-minimize'
        }
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader'
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.json$/,
        use: {
          loader: 'json-loader'
        }
      }
    ],
    noParse: [/mapbox\/vendor\/promise.js$/],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      __BUILDTYPE__: JSON.stringify('production'),
      __SAMPLE_ENABLED__: (process.env.SAMPLE_ENABLED === 'true'),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        API_PORT: (process.env.API_PORT || 3000),
        WEB_PORT: (process.env.WEB_PORT || 3333),
        API_URL: process.env.API_URL ? JSON.stringify(process.env.API_URL) : null,
        BASE_URL: process.env.BASE_URL ? JSON.stringify(process.env.BASE_URL) : null,
      }
    }),

    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]
};

baseConfig.devtool = '#eval-source-map';

module.exports = baseConfig;
