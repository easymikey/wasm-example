import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
import WasmPackPlugin from '@wasm-tool/wasm-pack-plugin';

const config: webpack.Configuration = {
	entry: './core/pkg/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	mode: 'development',
	experiments: {asyncWebAssembly: true},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		port: 3003,
	},
	resolve: {
		extensions: ['.js', '.ts'],
	},
	plugins: [
		new WasmPackPlugin({
			crateDirectory: path.resolve(__dirname, 'core'),
			outDir: path.join(__dirname, 'core/pkg'),
		}),
		new webpack.container.ModuleFederationPlugin({
			name: 'yew_counter',
			filename: 'remoteEntry.js',
			exposes: {
				'./yew': './core/pkg',
			},
		}),
	],
};

export default config;
