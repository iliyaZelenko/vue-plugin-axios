## Usage
Add Vue plugin
```js
import Vue from 'vue'
import VueAxios from 'vue-plugin-axios'
import axios from 'axios'
import store from '@/store'

Vue.use(VueAxios, {
  axios, 
  // example config for axios instance
  config: { // axios instance config
    baseURL: 'http://localhost:8000/', // api URL
    headers: { ... }, // default headers
    ...
  },
  interceptors: {
    // this function shows how to add Authorization header to requests
    beforeRequest (config, axiosInstance) {
      // your auth token
      const token = store.state.auth.token

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      
      return config
    },
    // this function shows how to add errors from server to client app
    beforeResponseError (error) {
      const { response, message } = error

      if (response) { // backend error
        // shows response error
        alert(error.response.data.message)
      } else if (message) { // network error
        alert(message)
      }
      
      // return Promise.reject(error)
    }
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
    this.users = await this.$get('api/get-users/')
    const randomUsers = await this.$get('https://randomuser.me/api/')
  }
}
```

## Installation

1. `npm install vue-plugin-axios --save` or `yarn add vue-plugin-axios`
2. add `Vue.use` like in code above


### This is how you can use with Nuxt.js (client + server):

```js
export default ({ store, app }, inject) => {
  // Vue.use(VueAxios, for some reason did not work
  VueAxios.install(Vue, {
    axios,
    nuxtInject: inject
  })
}
```

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

