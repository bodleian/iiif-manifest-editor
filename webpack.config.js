var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!bootstrap-sass/assets/javascripts/bootstrap.min.js',
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      applicationStyles: 'app/styles/app.scss',
      actions: 'app/actions/actions.jsx',
      reducers: 'app/reducers/reducers.jsx',
      configureStore: 'app/store/configureStore.jsx',
      Main: 'app/components/Main.jsx',
      Home: 'app/components/Home.jsx',
      OpenManifest: 'app/components/OpenManifest.jsx',
      OpenLocalManifestForm: 'app/components/OpenLocalManifestForm.jsx',
      OpenRemoteManifestForm: 'app/components/OpenRemoteManifestForm.jsx',
      NewManifest: 'app/components/NewManifest.jsx',
      EditManifest: 'app/components/EditManifest.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets')
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};
