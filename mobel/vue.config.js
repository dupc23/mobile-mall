const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
//导入预渲染插件，并且调用静态页面预渲染器
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: 'error', // 设置eslint报错时停止代码编译
    productionSourceMap: false, // 不需要生产环境的 source map（减小dist文件大小，加速构建）
    devServer: {
        open: true,  // npm run serve后自动打开页面
        host: '0.0.0.0',  // 匹配本机IP地址(默认是0.0.0.0)
        port: 8989 // 开发服务器运行端口号
    },
    chainWebpack: (config) => {
        // 第1个参数：别名，第2个参数：路径  （设置路径别名）
        config.resolve.alias
            .set('@pages', resolve('./src/page'))
            .set('@router', resolve('./src/router'))
            .set('@store', resolve('./src/store'))
            .set('@utils', resolve('./src/utils'));
        //配置代码分割
        // config.optimization.splitChunks({
        //     cacheGroups: {
        //         vendor: {
        //             chunks: "all",
        //             test: /[\\/]node_modules[\\/]/,
        //             name: "vendor",
        //             minChunks: 1,
        //             maxInitialRequests: 5,
        //             minSize: 0,
        //             priority: 100,
        //         },
        //         common: {
        //             chunks: "all",
        //             test: /[\\/]src[\\/]js[\\/]/,
        //             name: "common",
        //             minChunks: 2,
        //             maxInitialRequests: 5,
        //             minSize: 0,
        //             priority: 60
        //         },
        //         styles: {
        //             name: 'styles',
        //             test: /\.(sa|sc|c)ss$/,
        //             chunks: 'all',
        //             enforce: true,
        //         },
        //         runtimeChunk: {
        //             name: 'manifest'
        //         }
        //     }
        // });
    },
    configureWebpack: {
        plugins: [
            // 骨架屏配置
            new SkeletonWebpackPlugin({
                webpackConfig: {
                    entry: {
                        app: resolve('./src/entry-skeleton.js')
                    },
                },
                minimize: true,
                quiet: true,
                router: {
                    mode: 'hash',
                    routes: [
                        { path: '/', skeletonId: 'listSkeleton' },
                        { path: /^\/home/, skeletonId: 'listSkeleton' }
                    ]
                }
            }),
        //  预渲染插件配置
        //     new PrerenderSPAPlugin({
        //         staticDir: path.join(__dirname, './dist'),
        //         routes: ['/','/home'],
        //         //预渲染器，必须配置
        //         renderer: new Renderer({
        //             inject: {
        //                 foo: 'bar'
        //             },
        //             headless: false,
        //             //渲染后执行的方法名，在入口文件使用 document.dispatchEvent(new Event{'renderer-event'});
        //             renderAfterDocumentEvent: "renderer-event"
        //         }),
        //     }),
        ],
    },
    css: {
        extract: true
    }
    // configureWebpack: () => ({
    //     optimization: {
    //         splitChunks: {
    //             cacheGroups: {
    //                 vendor:{
    //                     chunks:"all",
    //                     test: /[\\/]node_modules[\\/]/,
    //                     name:"vendor",
    //                     minChunks: 1,
    //                     maxInitialRequests: 5,
    //                     minSize: 0,
    //                     priority:100,
    //                 },
    //                 common: {
    //                     chunks:"all",
    //                     test:/[\\/]src[\\/]js[\\/]/,
    //                     name: "common",
    //                     minChunks: 2,
    //                     maxInitialRequests: 5,
    //                     minSize: 0,
    //                     priority:60
    //                 },
    //                 styles: {
    //                     name: 'styles',
    //                     test: /\.(sa|sc|c)ss$/,
    //                     chunks: 'all',
    //                     enforce: true,
    //                 },
    //                 runtimeChunk: {
    //                     name: 'manifest'
    //                 }
    //             }
    //         }
    //     }
    // })
}




// const webpack = require("webpack");
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = ['js', 'css'];
// require("babel-polyfill");
// module.exports = {
//     publicPath: './',//打包后的位置(如果不设置这个静态资源会报404)
//     // publicPath: process.env.NODE_ENV === 'production' ? 'http://47.92.237.225:8080/dist' : './',
//     outputDir: 'dist',//打包后的目录名称
//     assetsDir: 'static',//静态资源目录名称
//     productionSourceMap: false,  //去掉打包的时候生成的map文件
//     lintOnSave: true,
//     filenameHashing: false,
//     devServer: {
//         sockHost: 'http://47.92.237.225:1111/',
//         disableHostCheck: true,
//         host: '0.0.0.0',  //不清楚主机和目的网络
//         port: 8080, // 源地址端口，自行修改
//         hotOnly: false,
//         useLocalIp: false,
//         proxy: {
//             '/ser': {
//                 target: 'http://127.0.0.1:8080/',  //跨域的域名
//                 ws: true,  // 代理 websockets
//                 changeOrigin: true, //是否开启跨域
//                 pathRewrite: {
//                     '^/ser': '/'  // 重写地址
//                 }
//             },
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//             }
//         },
//         configureWebpack: {
//             plugins: [
//                 // 配置jquery
//                 new webpack.ProvidePlugin({
//                     $: "jquery",
//                     jQuery: "jquery",
//                     "window.jQuery": "jquery",
//                     Popper: ["popper.js", "default"]
//                 }),
//                 new CompressionWebpackPlugin({
//                     asset: '[path].gz[query]',
//                     algorithm: 'gzip',
//                     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),  //匹配文件名
//                     // test: /\.js$|\.html$|.\css/,
//                     threshold: 10240,  //对超过10k的数据压缩
//                     minRatio: 0.8,
//                     deleteOriginalAssets: false  //不删除源文件
//                 })
//             ]
//         }
//     }
// }