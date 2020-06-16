const path = require('path');
const { LoaderOptionsPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TRUE } = require('node-sass');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'dist')
  };

  // Экспорт модуля в node.js
module.exports = {
    // Точка входа в приложение.
    entry: PATHS.source + '/index.js',
    output: {
      filename: '[name].js',
      path: path.build,
    },
 
  // module - настройка для обработки дополнительных модулей проекта.
  module: {
    rules: [
      //PUG
      {
      test: /\.pug$/,
      loader: 'pug-loader' 
      },
      //css
      {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader
          }]
      },
      //scss
      {
        test: /\.scss$/,
        use: ["style-loader", MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: { sourceMap: true }
      }, {
        loader: 'sass-loader',
        options: { sourceMap: true }
      }],
      },
      // image
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              // Четко указать пути до файлов иначе из pug картинки не будут подключаться.
              name: './[name].[ext]'
            },
          },
        ],
      },
      // svg
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      // fonts
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }, 
    ]
  },
     // plugins - плагины для кастомизации процесса сборки Webpack.
     plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/ui-kit.pug',
        inject: true
      }),
      new MiniCssExtractPlugin(
        {
          filename: '[name].css',
        }
      ),
    ],

}