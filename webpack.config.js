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
		path: PATHS.build,
	},

	// module - настройка для обработки дополнительных модулей проекта.
	module: {
		rules: [
			//PUG
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
					root: path.resolve(__dirname, 'src/assets/images')
				}
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
			{
				// Fonts
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				include: [path.resolve(__dirname, 'src/assets/fonts')],
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]'
				}
			},
			{
				// images / icons
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				exclude: [path.resolve(__dirname, 'src/assets/fonts')],
				options: {
					name: 'images/[name].[ext]',
					esModule: false,
				}
			}
		],
	},
	// plugins - плагины для кастомизации процесса сборки Webpack.
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/pages/ui-kit.pug',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
}