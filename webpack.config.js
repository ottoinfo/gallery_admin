const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const merge = require("webpack-merge")
const validate = require("webpack-validator")
const config_webpack = require("./configs/webpack")
const pkg = require("./package.json")

const PATHS = {
  app: path.join(__dirname, "src"),
  build: path.join(__dirname, "dist"),
  hbs: [
    path.join(__dirname, "public", "template.hbs"),
  ],
  files: [
    path.join(__dirname, "public", "images"),
  ],
  public: "/",
  style: [
    path.join(__dirname, "node_modules", "purecss"),
    path.join(__dirname, "public", "css", "main.css"),
  ],
  sass: [
    path.join(__dirname, "src", "components"),
  ],
}

const common = {
  entry: {
    app: PATHS.app,
    style: PATHS.style,
    vendor: ["react", "react-dom", "react-router"], //Object.keys(pkg.dependencies),
  },
  eslint: {
    quiet: false,
    emitError: false,
    failOnWarning: false,
    failOnError: false,
  },
  externals: {},
  plugins: [
    new HtmlWebpackPlugin({
      author: "Matthew Otto",
      description: "Gallery Admin",
      favicon: "public/images/favicon.jpg",
      filename: "index.html",
      template: "public/template.hbs",
      title: "Admin",
    }),
  ],
  resolve: {
    root: path.resolve('./src'),
    modulesDirectories: [ 'node_modules' ],
    extensions: [ '', '.js', '.jsx', '.json' ],
  },
  sassResources: [
    './public/css/_variables.scss',
    './public/css/_mixins.scss',
  ],
}

var config
// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
case "build":
  config = merge(
    {
      output: {
        chunkFilename: "[chunkhash].js",
        filename: "[name].[chunkhash].js",
        path: PATHS.build,
        publicPath: PATHS.public,
      },
    },
    common,
    config_webpack.clean(PATHS.build),
    config_webpack.extractBundle({
      name: "vendor",
      entries: ["react", "react-dom", "react-router"], //Object.keys(pkg.dependencies),
    }),
    config_webpack.extractCSS(PATHS.style),
    config_webpack.purifyCSS(PATHS.app),
    config_webpack.minify(),
    config_webpack.setupBabel(PATHS.app),
    config_webpack.setupFiles(PATHS.files),
    config_webpack.setupHBS(PATHS.hbs),
    config_webpack.setupJSON(PATHS.app),
    config_webpack.setupSASS(PATHS.sass),
    config_webpack.setFreeVariable(
      "process.env.NODE_ENV",
      "production"
    )
  )
  break
default:
  config = merge(
    {
      devtool: "eval-source-map",
    },
    common,
    config_webpack.setupBabel(PATHS.app),
    config_webpack.setupCSS(PATHS.style),
    config_webpack.setupSASS(PATHS.sass),
    config_webpack.setupFiles(PATHS.files),
    config_webpack.setupHBS(PATHS.hbs),
    config_webpack.setupJSON(PATHS.app)
  )
}

module.exports = config