//Configuración de webpack recomendada para cualquiera de nuestros proyectos para producción

const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {
    //Para que al momento de usar npm run build no lo haga en modo producción si no es modo desarrollo
    mode: 'production',

    //Para limpiar la carpeta dist
    output: {
        clean: true,
        filename: 'main.[contenthash].js',
    },

    //Modulo de reglas
    module: {
        rules: [
            {
                //Para que busque todo archivo con extension .html
                test: /\.html$/,
                //Para cargar el plugin instalado de npm html-loader
                loader: 'html-loader',
                //Esta regla nos ayuda a que si por ejemplo un atributo de un imagen se carga de una manera también haga el cambio
                options: {
                    sources: false,
                },
            },
            {
                test: /\.css$/,
                exclude: /style.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /style.css$/,
                use: [MiniCssExtract.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [new CssMinimizer(), new Terser()],
    },

    plugins: [
        new HtmlWebpack({
            title: 'Mi Webpack App',
            //La siguiente linea es totalmente opcional
            // filename: 'index.html',
            template: './src/index.html',
        }),
        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [{ from: 'src/assets/', to: 'assets/' }],
        }),
    ],
};
