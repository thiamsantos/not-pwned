import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import ignore from 'rollup-plugin-ignore'
import uglify from 'rollup-plugin-uglify'

const input = 'lib/not-pwned.js'
const defaultPlugins = [
  babel({
    babelrc: false,
    plugins: ['external-helpers'],
    presets: [['env', {modules: false}]]
  }),
  filesize()
]

const umdPlugins = [].concat(
  [
    ignore(['isomorphic-fetch']),
    commonjs(),
    resolve({
      browser: true
    })
  ],
  defaultPlugins
)

const minPlugins = [].concat(umdPlugins, [uglify()])

export default [
  {
    input,
    plugins: defaultPlugins,
    external: ['isomorphic-fetch', 'simple-sha1'],
    output: {
      file: 'dist/not-pwned.js',
      format: 'cjs'
    }
  },
  {
    input,
    context: 'window',
    plugins: umdPlugins,
    output: {
      file: 'dist/not-pwned-browser.js',
      format: 'umd',
      name: 'notPwned'
    }
  },
  {
    input,
    context: 'window',
    plugins: minPlugins,
    output: {
      file: 'dist/not-pwned-browser.min.js',
      format: 'umd',
      name: 'notPwned'
    }
  }
]
