var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!bootstrap-sass/assets/javascripts/bootstrap.min.js',
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new webpack.optimize.OccurrenceOrderPlugin(true),
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules',
      './app/components',
      './app/components/metadata-sidebar',
      './app/components/ui-toolkit',
      './app/data',
      'libraries'
    ],
    alias: {
      applicationStyles: 'app/styles/app.scss',
      actions: 'app/actions/actions.jsx',
      reducers: 'app/reducers/reducers.jsx',
      configureStore: 'app/store/configureStore.jsx'
    },
    extensions: ['*', '.js', '.jsx'],
    symlinks: false
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        },
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "app"),
        exclude: /(node_modules|bower_components)/
      },
      {
        loader: 'style-loader!css-loader',
        test: /\.css$/
      },
      {
        loader: 'url-loader',
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/
      },
      {
        loader: 'file-loader',
        test: /\.png$/
      },
      {
        loader: 'json-loader',
        test: /\.json$/
      },
      {
        loader: 'sass-loader', options: {
          sourceMap: true,
          includePaths: [
            path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets')
          ]
        },
        test: /\.scss$/,
      }
    ]
  },
  devtool: (process.env.NODE_ENV === "production") ? "cheap-module-source-map" : "eval-source-map"
};
