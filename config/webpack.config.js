const path = require('path');
const webpack = require('webpack');

const AssetsPlugin = require('assets-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const isProd = false;
const METADATA = {
    title: 'VIDEO GALLERY PAGE',
    baseUrl: '/'
};

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'main'     : './src/main.ts'
    },
    output: {
        path: path.resolve('www/assets/js'),

        /**
         * Specifies the name of each output file on disk.
         * IMPORTANT: You must not specify an absolute path here!
         *
         * See: http://webpack.github.io/docs/configuration.html#output-filename
         */
        filename: '[name].bundle.js',

        /**
         * The filename of the SourceMaps for the JavaScript files.
         * They are inside the output.path directory.
         *
         * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
         */
        sourceMapFilename: '[file].map',

        /** The filename of non-entry chunks as relative path
         * inside the output.path directory.
         *
         * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
         */
        chunkFilename: '[id].chunk.js',

        library: 'ac_[name]',
        libraryTarget: 'var',
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        // An array of directory names to be resolved to the current directory
        modules: [ "node_modules", path.resolve(__dirname, "src")],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
                    'awesome-typescript-loader?{configFileName: "tsconfig.json"}',
                    'angular2-template-loader',
                    {
                        loader: 'ng-router-loader',
                    }
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
                exclude: [ path.resolve(__dirname, "src")]
            },
            {
                test: /\.scss$/,
                use: ['to-string-loader', 'css-loader', 'sass-loader'],
                exclude: [path.resolve(__dirname, "src")]
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
                exclude: ['/index.html']
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new AssetsPlugin({
            path:  path.resolve('www/assets/js'),
            filename: 'webpack-assets.json',
            prettyPrint: true
        }),
        new CheckerPlugin(),
        new CommonsChunkPlugin({
            name: 'polyfills',
            chunks: ['polyfills']
        }),
        new CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['main'],
            minChunks: function (module) {
                return (/node_modules/).test(module.resource)
            }
        }),
        new CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),
        /**
         * Plugin: ContextReplacementPlugin
         * Description: Provides context to Angular's use of System.import
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
         * See: https://github.com/angular/angular/issues/11580
         */
        new ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),
        /*  new CopyWebpackPlugin([
         { from: 'src/assets', to: 'assets' },
         ]),*/
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'www/../../../index.html',
            title: METADATA.title,
            chunksSortMode: 'dependency',
            metadata: METADATA,
            inject: 'head'
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),

        new LoaderOptionsPlugin({}),

    ],
    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};