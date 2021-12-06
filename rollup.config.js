import { name, version } from './package.json'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import normalize from 'postcss-normalize'
import autoprefixer from 'autoprefixer'
import commonjs from '@rollup/plugin-commonjs'
import progress from 'rollup-plugin-progress'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import cssnano from 'cssnano'
import bundleScss from 'rollup-plugin-bundle-scss'
import ejs from 'rollup-plugin-ejs'

// import sass from 'rollup-plugin-sass'

const inputPath = './src'
const outputPath = './dist'

const banner = `/*!
 * ${name} v${version}
 * author: xuesh
 * Date: ${new Date().toUTCString()}
 */
`

const jsPlugins = [
	json(),
	resolve(),
	progress(),
	filesize({
		showGzippedSize: true,
	}),
	babel({
		exclude: 'node_modules/**',
	}),
	commonjs(),
	ejs({
		include: ['**/*.ejs', '**/*.html'], // optional, '**/*.ejs' by default
		exclude: ['**/index.html'], // optional, undefined by default
		compilerOptions: { client: true }, // optional, any options supported by ejs compiler
		loadStyles: true,
	}),
]

const postCSSPlugins = [normalize, autoprefixer]
export default [
	{
		input: `${inputPath}/style/style.scss`,
		output: {
			file: `${outputPath}/${name}.css`,
			format: 'es',
			banner,
		},
		plugins: [
			bundleScss({ exclusive: false }),
			postcss({
				extract: true,
				plugins: postCSSPlugins,
			}),
		],
	},
	{
		input: `${inputPath}/style/style.scss`,
		output: {
			file: `${outputPath}/${name}.min.css`,
			format: 'es',
			banner,
		},
		plugins: [
			postcss({
				extract: true,
				sourceMap: true,
				plugins: [...postCSSPlugins, cssnano()],
			}),
		],
	},
	{
		input: `${inputPath}/main.js`,
		output: {
			file: `${outputPath}/${name}.js`,
			format: 'umd',
			name: name.replace(/^[a-z]/, (a) => {
				return a.toUpperCase()
			}),
			banner,
		},
		plugins: jsPlugins,
	},
	{
		input: `${inputPath}/main.js`,
		output: {
			file: `${outputPath}/${name}.min.js`,
			format: 'umd',
			name: name,
			banner,
		},
		plugins: [...jsPlugins, terser()],
	},
]
