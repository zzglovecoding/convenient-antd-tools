import webpackMerge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import FileManagerPlugin from 'filemanager-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import getBaseConfig from './webpack.config.base';
import { name, parcel } from './package.json';

const { format = 'zip' } = parcel;

export default webpackMerge(getBaseConfig(), {
    mode: 'production',
    devtool: 'hidden-source-map',           // 在本地生成sourceMap, 调试时需要搭配Chrome DevTools关联本地sourceMap.
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true             // 是否支持sourceMap, 不是生成sourceMap
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    plugins: [
        new FileManagerPlugin({
            onStart: [{
                delete: ['./dist']
            }],
            onEnd: [{
                copy: [{
                    source: './build',
                    destination: `./dist/${name}`
                }],
                archive: [{
                    source: './dist',
                    destination: `./dist/${name}.${format}`,
                    format: format
                }]
            }]
        })
    ]
});