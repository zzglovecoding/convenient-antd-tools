import webpackMerge from 'webpack-merge';
import proxyConfig from '@easytool/proxy-config';
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import { devEnvironments } from './package.json';
import getBaseConfig from './webpack.config.base';

const { servers, proxies } = devEnvironments;
const baseConfig = getBaseConfig();
const output = baseConfig.output;

export default webpackMerge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
        },
        host: '0.0.0.0',
        port: servers.local,
        https: false,
        inline: true,
        compress: true,             // 开起 gzip 压缩
        disableHostCheck: true,
        historyApiFallback: {       // browserHistory路由
            index: output.publicPath
        },   
        contentBase: output.path,
        proxy: {
            ...proxyConfig(proxies)
        }
    },
    plugins: [
        // 依赖包大写分析
        // new WebpackBundleAnalyzer.BundleAnalyzerPlugin()
    ]
});