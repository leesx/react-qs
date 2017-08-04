/*
 * @Author: leesx
 * @Date: 2017-07-06 11:12:23
 * @Last Modified by: leesx
 * @Last Modified time: 2017-07-06 15:55:14
 */
const webpack = require('webpack')
path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    extractCSS = new ExtractTextPlugin('[name]-[contenthash:8].css'),
    assetsConfig = require("./assets.config.prod.json"),
    moment = require('moment'),
    autoprefixer = require('autoprefixer'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    webpackMd5Hash = require('webpack-md5-hash');
const nowDateStr       = moment().format("YYYY-MM-DD HH:mm:ss"),
      DEFINE_ANT_THEME = require('./theme.config.js'), // 修改antd.design主题文件
      __DEV__          = process.env.NODE_ENV === 'production'; //判断是否为生产环境


module.exports = {
    entry  : {
        index: './src/index.js'
    },
    output : {
        publicPath   : '/', //页面中静态资源链接的公共的url
        path         : path.resolve(__dirname, 'dist'), // 打包后文件输出的绝对地址
        filename     : "scripts/[name].[chunkhash].min.js", //打包后输出index.js
        chunkFilename: 'scripts/page/[name].[chunkhash].min.js', // 按需加载的页面模块
    },
    resolve: {
        extensions: [
            ".js", ".jsx", '.html'
        ],
        alias     : {
            assets    : path.resolve(__dirname, 'src/assets'),
            components: path.resolve(__dirname, 'src/components'),
            containers: path.resolve(__dirname, 'src/containers'),
            routes    : path.resolve(__dirname, 'src/routes'),
            utils   : path.resolve(__dirname, 'src/utils')
        }
    },
    module : {
        // loader 并列用! 设置参数用 ?
        rules: [
            {
                test   : /\.(js|jsx)$/, // test匹配需要转换的文件
                loader : require.resolve('babel-loader'),
                exclude: /node_modules/, // exclude匹配不需要转换的文件或目录
            }, {
                test: /\.(less)$/,
                use : ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use     : [
                        {
                            loader : 'css-loader',
                            options: {
                                minimize: true //css压缩
                            }
                        }, {
                            loader : require.resolve('postcss-loader'),
                            options: {
                                ident  : 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    autoprefixer({
                                        browsers: [
                                            '>1%', 'last 4 versions'
                                        ],
                                        flexbox : 'no-2009'
                                    })
                                ]
                            }
                        }, {
                            loader : require.resolve('less-loader'),
                            options: {
                                modifyVars: DEFINE_ANT_THEME
                            }
                        }
                    ]
                })
            }, {
                test   : /\.(png|jpg|gif)$/,
                include: [path.resolve('src/assets')],
                use    : {
                    loader : require.resolve('url-loader'),
                    options: {
                        limit : 8192, // 8192/1024 (kb)
                        prefix: 'img',
                        name  : 'images/[name].[hash].[ext]'
                    }
                }
            }, {
                test   : /\.(svg|eot|ttf|woff|woff2)$/,
                include: [path.resolve('src/assets')],
                use    : {
                    loader : require.resolve('url-loader'),
                    options: {
                        limit : 8192, // 8192/1024 (kb)
                        prefix: 'fonts',
                        name  : 'fonts/[name].[hash].[ext]'
                    }
                }
            }, {
                test: /\.(css)$/,
                use : [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        //清空打包目录
        new CleanWebpackPlugin(['dist/*.*'], {
            root   : __dirname, // An absolute path for the root  of webpack.config.js
            verbose: true, // Write logs to console.
            dry    : false, // Do not delete anything, good for testing.
            exclude: ['dist/scripts/common/*.*'], //排除其他文件
        }),
        new webpackMd5Hash(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV'  : JSON.stringify(process.env.NODE_ENV),
            'process.env.__CLIENT__': 'true'
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['common'], // 公共块的块名称
        //     minChunks: Infinity, // 最小被引用次数，最小是2。传递Infinity只是创建公共块，但不移动模块。
        //     filename: 'static/scripts/[name].[hash].js', // 公共块的文件名
        // }),
        new HtmlWebpackPlugin({
            filename  : path.resolve(__dirname, 'dist/index.html'),
            template  : 'src/assets/template/tpl.ejs',
            bundleName: assetsConfig.vendor.js,
            inject    : true,
            minify    : !__DEV__
                ? false
                : {
                    collapseWhitespace           : true,
                    collapseInlineTagWhitespace  : true,
                    removeRedundantAttributes    : true,
                    removeEmptyAttributes        : true,
                    removeScriptTypeAttributes   : true,
                    removeStyleLinkTypeAttributes: true,
                    removeComments               : true
                }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output  : {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.DllReferencePlugin({context: __dirname, manifest: require('./manifest.production.json')}),
        new ExtractTextPlugin({filename: "styles/default/[name].[chunkhash].min.css", disable: false, allChunks: true}),
        new webpack.BannerPlugin(`Copyright Hualala inc. \n update: ${nowDateStr}`)
    ]
};
