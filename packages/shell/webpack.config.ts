import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
	entry: './src/index.tsx',
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		port: 3001,
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.css'],
	},
	module: {
		rules: [
			// Use esbuild to compile JavaScript & TypeScript
			{
				// Match `.js`, `.jsx`, `.ts` or `.tsx` files
				test: /\.[jt]sx?$/,
				exclude: /yarn/,
				loader: 'esbuild-loader',
				options: {
					// JavaScript version to compile to
					target: 'es2015',
				},
			},
			{
				test: /\.module.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName:
									'[name]__[local]--[hash:base64:16]',
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new webpack.container.ModuleFederationPlugin({
			name: 'shell',
			remotes: {
				// Used modules
				react_counter:
					'react_counter@http://localhost:3002/remoteEntry.js',
				yew_counter: 'yew_counter@http://localhost:3003/remoteEntry.js',
			},
			shared: {
				react: {singleton: true},
				'react-dom': {singleton: true},
			},
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
};

export default config;
