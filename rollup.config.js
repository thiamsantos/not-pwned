import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import ignore from 'rollup-plugin-ignore'

const input = 'lib/not-pwned.js'
const defaultPlugins = [
  babel({
    babelrc: false,
    plugins: ['external-helpers'],
    presets: [['env', {modules: false}]]
  }),
  filesize()
]

export default [
  {
    input,
    plugins: defaultPlugins,
    external: ['isomorphic-fetch', 'simple-sha1'],
    output: [
      {
        file: 'dist/not-pwned.js',
        format: 'cjs'
      }
    ]
  },
  {
    input,
    context: 'window',
    plugins: [].concat(
      [
        ignore(['isomorphic-fetch']),
        commonjs(),
        resolve({
          browser: true
        })
      ],
      defaultPlugins
    ),
    output: {
      file: 'dist/not-pwned-browser.js',
      format: 'umd',
      name: 'notPwned'
    }
  }
]
