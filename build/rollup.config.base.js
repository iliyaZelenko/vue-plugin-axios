// import resolve from 'rollup-plugin-node-resolve'
// import commonjs from 'rollup-plugin-commonjs'
// import pkg from './package.json'
//
// const entry = 'index.js'
//
// export default [
//   // browser-friendly UMD build
//   {
//     input: entry,
//     output: {
//       name: 'VueAxiosWrapper',
//       file: pkg.browser,
//       format: 'umd'
//     },
//     plugins: [
//       resolve(), // so Rollup can find `ms` (ms - example dependencies lib)
//       commonjs() // so Rollup can convert `ms` to an ES module
//     ]
//   },
//
//   // CommonJS (for Node) and ES module (for bundlers) build.
//   // (We could have three entries in the configuration array
//   // instead of two, but it's quicker to generate multiple
//   // builds from a single configuration where possible, using
//   // an array for the `output` option, where we can specify
//   // `file` and `format` for each target)
//   {
//     input: entry,
//     // external: ['ms'],
//     output: [
//       { file: pkg.module, format: 'cjs' },
//       { file: pkg.main, format: 'es' }
//     ]
//   }
// ]
// import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import babel from 'rollup-plugin-babel'

const entry = 'src/index.js'

export default {
  input: entry,
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    eslint(),
    babel({
      exclude: 'node_modules/**'
      // 'plugins': [
      //   '@babel/plugin-external-helpers' // выдает не понятное предпреждение
      // ]
    })
  ],
  watch: { // https://rollupjs.org/guide/en#rollup-watch
    include: 'src/**'
  }
}
