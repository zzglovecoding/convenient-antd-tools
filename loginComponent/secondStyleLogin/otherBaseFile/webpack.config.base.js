import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import { name, parcel } from './package.json';

const BUILD_PATH = 'build';
const ASSETS_PATH = 'assets';
const CONTENT_HASH = '[contenthash:8]';

export function getPublicPath(publicPath = '') {
    return publicPath.endsWith('/') ? publicPath : publicPath + '/';
}

export default function(config = {}) {
    
    return {
        entry: {
            main: ['./src/index.jsx']
        },
        output: {
            publicPath: getPublicPath(parcel.publicPath),
            path: path.resolve(__dirname, BUILD_PATH),
            filename: `${ASSETS_PATH}/js/[name].${CONTENT_HASH}.js`,
            chunkFilename: `${ASSETS_PATH}/js/[name].${CONTENT_HASH}.chunk.js`,
            // 避免多个应用之间 jsonpFunction 名冲突
            jsonpFunction: `webpackJsonp_${name}`
        },
        resolve: {
            extensions: ['.js', '.jsx', '.css', '.less', '.scss', '.sass'],
            alias: {
                '@': path.resolve('src')
            }
        },
        optimization: {
            splitChunks: {
                minSize: 10,
                minChunks: 1,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            },
            noEmitOnErrors: true
        },
        module: {
            rules: [{
                /**
                 * 主项目js
                 */
                test: /\.(js|jsx)?$/,
                include: path.resolve(__dirname, 'src'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }]
            }, {
                /**
                 * 主项目css
                 */
                test: /\.(css|less|scss|sass)$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]__[hash:base64:5]',
                            minimize: {
                                safe: true
                            }
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                    // 'sass-loader'
                ]
            }, {
                /**
                 * 第三方css
                 */
                test: /\.(css|less|scss|sass)$/,
                include: path.resolve(__dirname, 'node_modules'),
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                    'less-loader'
                    // 'sass-loader'
                ]
            }, {
                /**
                 * 全局字体
                 */
                test: /\.(woff|eot|ttf|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: `${ASSETS_PATH}/fonts/[name].${CONTENT_HASH}.[ext]`
                    }
                }]
            }, {
                /**
                 * 全局图片
                 */
                test: /\.(bmp|png|jpg|jpeg|gif|svg)$/,
                exclude: path.resolve(__dirname, 'src/fonts'),
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: `${ASSETS_PATH}/images/[name].${CONTENT_HASH}.[ext]`
                    }
                }]
            }, {
                /**
                 * favicon
                 */
                test: /\.ico$/,
                include: path.resolve(__dirname, 'src/images'),
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: `${ASSETS_PATH}/images/[name].[ext]`
                    }
                }]
            }]
        },
        plugins: [
            // 清除编译目录
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: `${ASSETS_PATH}/css/[name].${CONTENT_HASH}.css`,
                chunkFilename: `${ASSETS_PATH}/css/[name].${CONTENT_HASH}.chunk.css`   // chunk css file
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: './public/config.js',
                        to: './'
                    }
                ]
            }),
            // index.html 模板插件
            new HtmlWebpackPlugin({                             
                filename: 'index.html',
                template: './src/template.ejs',
                faviconPath: `/${ASSETS_PATH}/images/favicon.ico`
            }),
            // style规范校验
            new StyleLintPlugin({
                context: 'src',
                files: '**/*.(c|sc|sa|le)ss',
                fix: true,
                cache: true
            }),
            // 文件大小写检测
            new CaseSensitivePathsPlugin()
        ]
    };
}