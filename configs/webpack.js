const webpack = require("webpack")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const PurifyCSSPlugin = require("purifycss-webpack-plugin")

exports.clean = function(folder) {
  return {
    plugins: [
      new CleanWebpackPlugin([folder], {
        root: process.cwd(),
      }),
    ],
  }
}

exports.devServer = function(options) {
  return {
    devServer: {
      historyApiFallback: true, // Enable history API fallback so HTML5 History API
      hot: true, // Unlike the cli flag, this doesn"t set HotModuleReplacementPlugin!
      inline: true,
      stats: "errors-only", // Display only errors to reduce the amount of output.
      host: options.host, // Defaults to `localhost`
      port: options.port, // Defaults to 8080
      proxy: { // proxy api to dev server for local development
        "/api_fails/*": {
          "target": {
            "host": "localhost",
            "protocol": "http:",
            "port": 3000,
          },
          ignorePath: true,
          changeOrigin: false,
          secure: false,
        },
      },
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      new webpack.HotModuleReplacementPlugin({
        multiStep: true,
      }),
    ],
  }
}

exports.extractBundle = function(options) {
  const entry = {}
  entry[options.name] = options.entries

  return {
    entry: entry, // Define an entry point needed for splitting.
    plugins: [
      // Extract bundle and manifest files. Manifest is
      // needed for reliable caching.
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, "manifest"],
      }),
    ],
  }
}

exports.extractCSS = function(paths) {
  return {
    module: {
      loaders: [{
        include: paths,
        loader: ExtractTextPlugin.extract("style", "css", "postcss"),
        test: /\.css$/,
      }],
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin("[name].[chunkhash].css"),
    ],
  }
}

exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        beautify: false, // Don"t beautify output (enable for neater output)
        comments: false, // Eliminate comments
        compress: { // Compression specific options
          drop_console: true, // Drop `console` statements
          warnings: false,
        },
        mangle: { // Mangling specific options
          except: ["$"], // Don"t mangle $
          keep_fnames: true, // Don"t mangle function names
          screw_ie8: true, // Don"t care about IE8
        },
      }),
      new webpack.optimize.DedupePlugin(),
      // new webpack.optimize.OccurenceOrderPlugin(),
    ],
  }
}

exports.purifyCSS = function(paths) {
  return {
    plugins: [
      new PurifyCSSPlugin({
        basePath: process.cwd(),
        paths: paths,
      }),
    ],
  }
}

exports.setFreeVariable = function(key, value) {
  const env = {}
  env[key] = JSON.stringify(value)
  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ],
  }
}

exports.setupBabel = function(paths) {
  return {
    module: {
      loaders: [{
        exclude: /node_modules/,
        include: paths,
        loaders: ["babel", "eslint-loader"],
        test: /\.jsx?$/,
      }],
    },
  }
}

exports.setupCSS = function(paths) {
  return {
    module: {
      loaders: [{
        include: paths,
        loaders: ["style", "css", "postcss"],
        test: /\.css$/,
      }],
    },
  }
}

exports.setupHBS = function(paths) {
  return {
    module: {
      loaders: [{
        exclude: /node_modules/,
        include: paths,
        loader: "handlebars",
        test: /\.hbs$/,
      }],
    },
  }
}

exports.setupFiles = function(paths) {
  return {
    module: {
      loaders: [{
        exclude: /node_modules/,
        include: paths,
        loader: "file",
        test: /\.(gif|png|jpg|mp3|mp4)$/,
        query: {
        },
      }],
    },
  }
}

exports.setupFonts = function(paths, location="public/fonts/") {
  return {
    module: {
      loaders: [{
        exclude: /node_modules/,
        include: paths,
        loader: "file",
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        query: {
          name: location + "[name].[ext]",
        },
      }],
    },
  }
}

exports.setupFontsURL = function(paths, location="public/fonts/") {
  return {
    module: {
      loaders: [{ 
        exclude: /node_modules/,
        include: paths,
        loader: "url",
        test: /\.svg$/,
        query: {
          limit: 65000,
          mimetype: "image/svg+xml",
          name: location + "[name].[ext]",
        },
      }, {
        exclude: /node_modules/,
        include: paths,
        loader: "url",
        test: /\.woff$/,
        query: {
          limit: 65000,
          mimetype: "application/font-woff",
          name: location + "[name].[ext]",
        },
      }, {
        exclude: /node_modules/,
        include: paths,
        loader: "url",
        test: /\.woff2$/,
        query: {
          limit: 65000,
          mimetype: "application/font-woff2",
          name: location + "[name].[ext]",
        },
      }, {
        exclude: /node_modules/,
        include: paths,
        loader: "url",
        test: /\.[ot]t$/, 
        query: {
          limit: 65000,
          mimetype: "application/octet-stream",
          name: location + "[name].[ext]",
        },
      }, {
        exclude: /node_modules/,
        include: paths,
        loader: "url",
        test: /\.eot$/,
        query: {
          limit: 65000,
          mimetype: "application/vnd.ms-fontobject",
          name: location + "[name].[ext]",
        },
      }],
    },
  }
}

exports.setupJSON = function(paths) {
  return {
    module: {
      loaders: [{
        exclude: /node_modules/,
        include: paths,
        loader: "json",
        test: /\.json$/,
      }],
    },
  }
}

exports.setupSASS = function(paths, opts={}) { // opts include=FALSE||"PATH", module=FALSE||FALSE
  return {
    module: {
      loaders: [{
        include: paths,
        loader: ExtractTextPlugin.extract(
          "style",
          "css" + (opts.module ? "?modules&importLoaders=1&localIdentName=[folder]_[name]_[local]_[hash:base64:5]" : "") + "!" +
          "postcss!" +
          "sass?outputStyle=expanded" + (opts.include ? ("&includePaths[]=" + opts.include) : "") + "!" +
          (opts.resources ? "sass-resources" : "")
        ),
        test: /\.scss$/,
      }],
    },
  }
}