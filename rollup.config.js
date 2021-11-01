import { name } from './package.json'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import normalize from 'postcss-normalize'
import autoprefixer from 'autoprefixer'
// import sass from 'rollup-plugin-sass'

const inputPath = './src'
const outputPath = './dist'
const jsPlugins = [
	json(),
	resolve(),
	// progress(),
	// filesize({
	// 	showGzippedSize: true,
	// }),
	babel({
		exclude: 'node_modules/**',
	}),
	// commonjs(),
]

const postCSSPlugins = [normalize, autoprefixer]
export default [
	{
		input: `${inputPath}/style/style.scss`,
		output: {
			file: `${outputPath}/${name}.css`,
			format: 'es',
		},
		plugins: [
			postcss({
				extract: true,
				plugins: postCSSPlugins,
			}),
		],
	},
	{
		input: `${inputPath}/main.js`,
		output: {
			file: `dist/${name}.js`,
			format: 'umd',
			name: name,
		},
		plugins: jsPlugins,
	},
]
