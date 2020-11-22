const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TRUE } = require('node-sass');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const PATHS = {
	source: path.join(__dirname, 'src/pages'),
	build: path.join(__dirname, 'docs/')
};

// Экспорт модуля в node.js
module.exports = {
	// Точка входа в приложение.
	entry: {
		colorsAndType: (`${PATHS.source}/colors-and-type/colors-and-type.js`),
		formElements: (`${PATHS.source}/form-elements/form-elements.js`),
		cards: (`${PATHS.source}/cards/cards.js`),
		headerAndFooter: (`${PATHS.source}/header-and-footer/header-and-footer.js`),
		landing: (`${PATHS.source}/landing/landing.js`),
		searchRoom: (`${PATHS.source}/search-room/search-room.js`),
		roomDetails: (`${PATHS.source}/room-details/room-details.js`),
		registration: (`${PATHS.source}/registration/registration.js`),
		signIn: (`${PATHS.source}/sign-in/sign-in.js`),
	},
	output: {
		filename: '[name].[hash].js',
		path: __dirname + '/docs',
	},
	devServer: {
		index: 'landing.html', //Запускаемый файл в режиме разработки
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
			filename: 'colors-and-type.html',
			template: './src/pages/colors-and-type/colors-and-type.pug',
			chunks: ['colorsAndType'],
		}),
		new HtmlWebpackPlugin({
			filename: 'form-elements.html',
			template: './src/pages/form-elements/form-elements.pug',
			chunks: ['formElements'],
		}),
		new HtmlWebpackPlugin({
			filename: 'cards.html',
			template: './src/pages/cards/cards.pug',
			chunks: ['cards'],
		}),
		new HtmlWebpackPlugin({
			filename: 'header-and-footer.html',
			template: './src/pages/header-and-footer/header-and-footer.pug',
			chunks: ['headerAndFooter'],
		}),
		new HtmlWebpackPlugin({
			filename: 'landing.html',
			template: './src/pages/landing/landing.pug',
			chunks: ['landing'],
		}),
		new HtmlWebpackPlugin({
			filename: 'search-room.html',
			template: './src/pages/search-room/search-room.pug',
			chunks: ['searchRoom'],
		}),
		new HtmlWebpackPlugin({
			filename: 'room-details.html',
			template: './src/pages/room-details/room-details.pug',
			chunks: ['roomDetails'],
		}),
		new HtmlWebpackPlugin({
			filename: 'registration.html',
			template: './src/pages/registration/registration.pug',
			chunks: ['registration'],
		}),
		new HtmlWebpackPlugin({
			filename: 'sign-in.html',
			template: './src/pages/sign-in/sign-in.pug',
			chunks: ['signIn'],
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new webpack.ProvidePlugin({
			$: 'jquery/dist/jquery.min.js',
			jQuery: 'jquery/dist/jquery.min.js',
			'window.jQuery': 'jquery/dist/jquery.min.js',
		}),
		new FaviconsWebpackPlugin({
			logo: './src/assets/favicon/favicon.svg',
			outputPath: './favicons',
			publicPath: './favicons',
			prefix: '',
			inject: true,
		}),
	],
}