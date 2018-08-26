## Usage
Add Vue plugin
```js
import Vue from 'vue'
import VueAxiosWrapper from 'vue-axios-wrapper'
import axios from 'axios'
import store from '@/store'

Vue.use(VueAxiosWrapper, {
  axios, 
  // example config for axios instance
  config: { 
    baseURL: 'http://localhost:8000',
    headers: { // global headers
      'X-Custom-Header': 'my-token'
    },
    interceptors: {
      beforeRequest (config, axiosInstance) {
        let newConfig
        const token = store.state.token // here your auth token
  
        if (token) {
          newConfig = axiosInstance.setHeader({
            auth: token, // thiw will set 'Authorization' header, no need prefix 'Bearer '
            'X-Custom-Header': 'value1' // example header
          })
        } else {
          newConfig = axiosInstance.deleteHeader('auth') // delete 'Authorization' header if token expired
        }
  
        return (newConfig && (Object.assign(config, newConfig))) || config
      },
      beforeResponseError (error) {
        if (error.response.data.message) {
          alert(error.response.data.message) // show response error
  
          return Promise.reject(error)
        }
      }
    },
    ...
  }
})
```
Now you can access from a component: 

```js
// no need to import
export default {
  data: () => ({
    users: null
  }),
  async mounted () {
    // automatic data return, no need to ".data"
    this.users = await this.$get('/api/get-users/')
    const randomUsers = await this.$get('https://randomuser.me/api/')
  }
}
```

## Installation

1. `yarn add vue-plugin-axios`
2. add `Vue.use` like in code above



## Full API
$get(endpoint[, config])

$delete(endpoint[, config])

$head(endpoint[, config])

$options(endpoint[, config])

$post(endpoint[, data[, config]])

$put(endpoint[, data[, config]])

$patch(endpoint[, data[, config]])

##### Axios instance:
`$axios` or `$http`

For full response you can use:
```js 
const { data, status, statusText, headers } = await this.$axios.post('/api/get-users')
```

##### Set custom header:
```js
$axios.setHeader('X-Custom-Header', 'value')
```
or multiple:
```js
$axios.setHeader({
  auth: token, // thiw will set 'Authorization' header, no need prefix 'Bearer '
  'X-Custom-Header': 'value',
  'Y-Custom-Header': 'value'
})
```

#### Set Authorization token header:
```js 
$axios.setToken(token[, type = 'Bearer'])
```

##### Delete header: 
```js
deleteHeader('X-Custom-Header')
deleteHeader(['X-Custom-Header', 'Y-Custom-Header'])
```
