import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import proxyConfig from '@easytool/proxy-config';
import defineConfig from '@easytool/define-config';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import { devEnvironments, parcel } from './package.json';
import baseConfig, { getPublicPath } from './webpack.config.base';

const { server, proxy, globals, proxyTest } = devEnvironments;

export default webpackMerge(baseConfig(parcel), {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
        },
        host: '0.0.0.0',
        port: server.local,
        https: false,
        inline: true,
        compress: true,             // 开起 gzip 压缩
        disableHostCheck: true,
        historyApiFallback: {       // browserHistory路由
            index: getPublicPath(parcel.publicPath)
        },   
        contentBase: path.resolve(__dirname, 'build'),
        proxy: {
            ...proxyConfig(process.env.proxy_mode === 'test' ? proxyTest : proxy)
        }
    },
    module: {
        rules: [{
            /**
             * eslint代码规范校验
             */
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            include: path.resolve(__dirname, 'src'),
            use: [{
                loader: 'eslint-loader',
                options: {
                    fix: true,
                    configFile: '.eslintrc.json'
                }
            }]
        }]
    },
    plugins: [
        // 依赖包大写分析
        // new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
        // 清除编译目录
        // new CleanWebpackPlugin(),
        // 配置全局变量
        new webpack.DefinePlugin({
            ...defineConfig(globals),
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
});
