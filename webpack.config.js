const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TRUE } = require('node-sass');
const PATHS = {
	source: path.join(__dirname, 'src/pages'),
	build: path.join(__dirname, 'docs/')
};

// Экспорт модуля в node.js
module.exports = {
	// Точка входа в приложение.
	entry: {
		landing: (`${PATHS.source}/landing/landing.js`),
		UIkit: (`${PATHS.source}/ui-kit/ui-kit.js`),
		searchroom: (`${PATHS.source}/search-room/search-room.js`),
		roomdetails: (`${PATHS.source}/room-details/room-details.js`),
		registration: (`${PATHS.source}/registration/registration.js`),
		signin: (`${PATHS.source}/sign-in/sign-in.js`),
	},
	output: {
		filename: '[name].[hash].js',
		path: __dirname + '/docs',
	},
	devServer: {
		index: 'sign-in.html', //Запускаемый файл в режиме разработки
		port: 9000,
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
				use: ["style-loader", MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
				]},
			//scss
			{
				test: /\.scss$/,
				use: ["style-loader", MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
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
			filename: 'ui-kit.html',
			template: './src/pages/ui-kit/ui-kit.pug',
			chunks: ['UIkit'],
		}),
		new HtmlWebpackPlugin({
			filename: 'landing.html',
			template: './src/pages/landing/landing.pug',
			chunks: ['landing'],
		}),
		new HtmlWebpackPlugin({
			filename: 'search-room.html',
			template: './src/pages/search-room/search-room.pug',
			chunks: ['searchroom'],
		}),
		new HtmlWebpackPlugin({
			filename: 'room-details.html',
			template: './src/pages/room-details/room-details.pug',
			chunks: ['roomdetails'],
		}),
		new HtmlWebpackPlugin({
			filename: 'registration.html',
			template: './src/pages/registration/registration.pug',
			chunks: ['registration'],
		}),
		new HtmlWebpackPlugin({
			filename: 'sign-in.html',
			template: './src/pages/sign-in/sign-in.pug',
			chunks: ['signin'],
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery' : 'jquery'
		}),
	],
}