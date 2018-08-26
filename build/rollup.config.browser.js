import base from './rollup.config.base'
import { uglify } from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'
import pkg from '../package.json'

const config = {
  ...base,
  output: {
    exports: 'named',
    name: 'VuePluginAxios',
    file: pkg.unpkg,
    format: 'iife'
  }
}

config.plugins.push(uglify({}, minify))

export default config
