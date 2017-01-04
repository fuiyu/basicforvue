{
  

  entry: "./app/entry", // string | object | array
  // 应用开始执行的地方
  //webpack开始building

  output: {
    // options related how webpack emits results

    path: path.resolve(__dirname, "dist"), // string
    // the target directory for all output files 输出的文件夹
    // must be an absolute path (use the Node.js path module) 必须为绝对路径

    filename: "bundle.js", // string 
    // the filename template for entry chunks   

    publicPath: "/assets/", // string
    // the url to the output directory resolved relative to the HTML page  相对于输出html页面的地址

    library: "MyLibrary", // string,
    // the name of the exported library

    libraryTarget: "umd", // enum
    // the type of the exported library

    /* Advanced output configuration (click to show) */
  },

  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)   loaders,parser的配置

      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        exclude: [
            path.resolve(__dirname, "app/demo-files")
          ]
          // matching conditions, each accepting regular expression or string
          // test and include behave equal, both must be matched
          // exclude must not be matched (takes preferrence over test and include)
          // Best practices:
          // - Use RegExp only in test and for filename matching
          // - Use arrays of absolute paths in include and exclude
          // - Try to avoid exclude and prefer include

          issuer: {
          test,
          include,
          exclude
        },
        // conditions for the issuer (the origin of the import)

        enforce: "pre",
        enforce: "post",
        // apply these rule even if rules are overridden (advanced option)

        loader: "babel-loader",
        // the loader which should be applied, it'll be resolve relative to the context
        // -loader suffix is no longer optional in Webpack 2 for clarity reasons
        // see webpack 1 upgrade guide

        options: {
          presets: ["es2015"]
        },
        // options for the loader
      },

      {
        test: "\.html$"

          use: [
          // apply multiple loaders and options
          "htmllint-loader", {
            loader: "html-loader",
            options: {
              /* ... */
            }
          }
        ]
      },

      {
        oneOf: [ /* rules */ ]
      }
      // only use one of these nested rules

      {
        rules: [ /* rules */ ]
      }
      // use all of these nested rules (combine with conditions to be useful)

      {
        resource: {
          and: [ /* conditions */ ]
        }
      }
      // matches only if all conditions are matched

      {
        resource: {
          or: [ /* conditions */ ]
        }
      } {
        resource: [ /* conditions */ ]
      }
      // matches if any condition is matched (default for arrays)

      {
        resource: {
          not: /* condition */
        }
      }
      // matches if the condition is not matched
    ],

    /* Advanced module configuration (click to show) */
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    // directories where to look for modules

    extensions: [".js", ".json", ".jsx", ".css"],
    // extensions that are used

    alias: {
      // a list of module name aliases

      "module": "new-module"
        // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"

        "only-module$": "new-module",
      // alias "only-module" -> "new-module", but not "module/path/file" -> "new-module/path/file"
    },
    /* alternative alias syntax (click to show) */

    /* Advanced resolve configuration (click to show) */
  },

  devtool: "source-map", // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.

  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory

  target: "web", // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

  externals: ["react", /^@angular\//],
  // Don't follow/bundle these modules, but request them at runtime from the environment

  stats: {
    /* TODO */
  },

  devServer: {
    /* TODO */
  },

  plugins: [
    // ...
  ],
  // list of additional plugins

  /* Advanced configuration (click to show) */
}