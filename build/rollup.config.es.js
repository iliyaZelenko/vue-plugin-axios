import base from './rollup.config.base'
import pkg from '../package.json'

export default {
  ...base,
  output: {
    name: pkg.name,
    file: pkg.module,
    format: 'es'
  }
}

// export default {
//   ...base, // Object.assign({}, base, {
//   output: {
//     name: pkg.name,
//     file: pkg.module,
//     format: 'es'
//   }
// }
