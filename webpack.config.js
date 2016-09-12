require("babel-polyfill")
const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const autoprefixer = require("autoprefixer")
const merge = require("webpack-merge")
const validate = require("webpack-validator")
const configEnv = require("./configs/env")
const configWebpack = require("./configs/webpack")
const pkg = require("./package.json")

const PATHS = {
  app: [ path.join(__dirname, "src") ],
  build: path.join(__dirname, "dist", "html"),
  hbs: [ path.join(__dirname, "public", "template.hbs") ],
  files: [ path.join(__dirname, "public") ],
  fonts: [ path.join(__dirname, "public", "fonts") ],
  public: "/",
  sass: [ path.join(__dirname, "public", "css") ],
  sass_modules: [ path.join(__dirname, "src") ],
  src: path.join(__dirname, "src", "index.js"),
  style: [
    path.join(__dirname, "public", "css", "style.scss"),
  ],
}

const vendorPackages = Object.keys(pkg.dependencies)

const common = merge(
  {
    entry: {
      "babel-polyfill": "babel-polyfill",
      app: PATHS.src,
      style: PATHS.style,
      vendor: vendorPackages,
    },
    output: {
      chunkFilename: "[hash].js",
      filename: "[name].[hash].js",
      path: PATHS.build,
      publicPath: PATHS.public,
    },
    eslint: {
      quiet: false,
      emitError: false,
      failOnWarning: false,
      failOnError: false,
    },
    externals: {},
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: configEnv.NODE_ENV,
          API_URL: configEnv.API_URL,
          BASE_URL: configEnv.BASE_URL,
        },
      }),
      new HtmlWebpackPlugin({
        author: "Matthew Otto",
        description: "Gallery Admin",
        favicon: "public/images/favicon.jpg",
        filename: "index.html",
        template: "public/template.hbs",
        title: "Admin",
      }),
      new ExtractTextPlugin("style.[hash].css", {
        allChunks: true,
        disable: true, // CSS MODULES
      }),
    ],
    resolve: {
      root: path.resolve("./src"),
      modulesDirectories: [ "node_modules" ],
      extensions: [ "", ".js", ".jsx", ".json" ],
    },
    postcss: [
      autoprefixer({ browsers: ["last 2 versions"] }),
    ],
    sassResources: [
      path.join(__dirname, "public/css/_mixins.scss"),
      path.join(__dirname, "public/css/_variables.scss"),
      path.join(__dirname, "public/css/_resets.scss"),
    ],
  },
  configWebpack.setupBabel(PATHS.app),
  configWebpack.setupFiles(PATHS.files),
  configWebpack.setupFonts(PATHS.fonts),
  configWebpack.setupHBS(PATHS.hbs),
  configWebpack.setupJSON(PATHS.app),
  configWebpack.setupSASS(PATHS.sass),
  configWebpack.setupSASS(PATHS.sass_modules, { module: true, resources: true })
)

let config
// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
case "build":
  config = merge(
    common,
    configWebpack.clean(PATHS.build),
    configWebpack.extractBundle({
      name: "vendor",
      entries: vendorPackages,
    }),
    configWebpack.extractCSS(PATHS.style),
    configWebpack.purifyCSS(PATHS.app),
    configWebpack.minify(),
    configWebpack.setFreeVariable(
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
    configWebpack.devServer({
      host: process.env.HOST,
      port: process.env.PORT,
    }),
    configWebpack.setupCSS(PATHS.style)
  )
}

module.exports = config // validate(config) breaks w/ sassResources