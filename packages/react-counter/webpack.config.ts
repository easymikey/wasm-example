import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
import {FederatedTypesPlugin} from '@module-federation/typescript';
import {ModuleFederationPluginOptions} from '@module-federation/typescript/src/types';

const federationConfig: ModuleFederationPluginOptions = {
	name: 'react_counter',
	filename: 'remoteEntry.js',
	exposes: {
		'./ReactCounter': './src/ReactCounter.tsx',
	},
	shared: {
		react: {singleton: true},
		'react-dom': {singleton: true},
	},
};
const config: webpack.Configuration = {
	entry: './src/index.tsx',
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		hot: true,
		port: 3002,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	},
	output: {
		publicPath: 'auto',
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
		new FederatedTypesPlugin({
			federationConfig,
		}),

		new webpack.container.ModuleFederationPlugin(federationConfig),
	],
};

export default config;
