import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import defineConfig from '@easytool/define-config';
import baseConfig from './webpack.config.base';
import { devEnvironments } from './package.json';

const { globals } = devEnvironments;

export default webpackMerge(baseConfig(), {
    mode: 'production',
    devtool: 'hidden-source-map',           // source-map在本地, 调试时需要Chrome的DevTools关联.
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true             // 是否支持sourceMap, 不是生成sourceMap
            }),
            new OptimizeCSSAssetsPlugin()
        ]
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
                    configFile: '.eslintrc.prod.json'
                }
            }]
        }]
    },
    plugins: [
        // 配置全局变量
        new webpack.DefinePlugin({
            ...defineConfig(globals, false),             // 'false'表示所有自定义全局变量的值设为 false
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});
