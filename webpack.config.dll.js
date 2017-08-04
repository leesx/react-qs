const webpack            = require('webpack'),
      path               = require('path'),
      AssetsPlugin       = require('assets-webpack-plugin'),
      WebpackMd5Hash     = require('webpack-md5-hash'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      moment             = require('moment'),
      nowDateStr         = moment().format("YYYY-MM-DD HH:mm:ss");

const vendors = [
    'react',
    'react-dom',
    'react-router',
    'immutable',
    // 'redux',
    // 'react-redux',
    //'react-router-redux',
];

const __DEV__          = process.env.NODE_ENV === 'production'
const manifestFileName = __DEV__ ? 'manifest.production.json' : 'manifest.development.json'

const config = {
    entry  : {
        vendor: vendors,
    },
    output : {
        //publicPath: '/',
        path         : path.resolve(__dirname, 'dist'), // 打包后文件输出的绝对地址
        filename     : 'scripts/common/[name].js',
        library      : '[name]_library',
        libraryTarget: "umd"
    },
    plugins: [
        new webpack.DllPlugin({
            path   : manifestFileName,
            name   : '[name]_library',
            context: __dirname,
        }),
        // new webpack.LoaderOptionsPlugin({
        //     minimize: __DEV__,
        //     debug: !__DEV__
        // }),
        new AssetsPlugin({
            filename: __DEV__ === true ? 'assets.config.prod.json' : 'assets.config.dev.json',
            path    : __dirname,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),

    ],
    devtool: 'source-map',
};

//生产环境构建
if (__DEV__ === true) {
    config.output.publicPath = '/';
    config.output.filename   = 'scripts/common/[name].[chunkhash].min.js';

    const productionPlugins = [
        new CleanWebpackPlugin(['dist/*.*'], {
            root   : __dirname, // An absolute path for the root  of webpack.config.js
            verbose: true,// Write logs to console.
            dry    : true, // Do not delete anything, good for testing.
            //exclude:['vendor.js'], //排除其他文件
        }),
        new WebpackMd5Hash(),
        new webpack.optimize.UglifyJsPlugin({
            output  : {
                comments: false,
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.BannerPlugin(`Copyright Hualala inc. \n update: ${nowDateStr}`),
    ];
    config.plugins.push(...productionPlugins);
}

module.exports = config;
