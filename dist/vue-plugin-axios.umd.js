(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueAxiosWrapper = factory());
}(this, (function () { 'use strict';

  function requestPromiseWrap (method, arg) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = (await this[method](...arg)).data;

        resolve(data);
      } catch (e) {
        reject(e);
      }
    })
  }

  const plugin = {
    install (Vue, options = {}) {
      const {
        axios,
        config = {},
        interceptors = {
          // beforeRequest
          // beforeRequestError
          // beforeResponse
          // beforeResponseError
        }
      } = options;

      if (!axios) throw new Error('Vue-axios-wrapper: please, specify in the settings your axios package.')

      const module = new Module(axios, config, {
        interceptors
      });
      // {
      //   baseURL: 'https://some-domain.com/api/',
      //   timeout: 1000,
      //   headers: {'X-Custom-Header': 'foobar'}
      // }

      Object.assign(Vue.prototype, module);
    }
  };

  function Module (axiosPackage, config, other) {
    const self = this;

    self.axiosInstance = axiosPackage.create(config);

    // расширяет
    axiosInstanceSetCustomHelpers(self);
    // разрешает пользовательские interceptors
    axiosInstanceSetInterceptors(self, other.interceptors);

    // public obj
    return {
      get $post () {
        return (...arg) => requestPromiseWrap.apply(self.axiosInstance, ['post', arg])
      },

      get $get () {
        return (...arg) => requestPromiseWrap.apply(self.axiosInstance, ['get', arg])
      },

      get $put () {
        return (...arg) => requestPromiseWrap.apply(self.axiosInstance, ['put', arg])
      },

      get $patch () {
        return (...arg) => requestPromiseWrap.apply(self.axiosInstance, ['patch', arg])
      },

      get $delete () {
        return (...arg) => requestPromiseWrap.apply(self.axiosInstance, ['delete', arg])
      },

      get $head () {
        return (...arg) => requestPromiseWrap.apply(self.axiosInstance, ['patch', arg])
      },

      get $options () {
        return (...arg) => requestPromiseWrap.apply(self.axiosInstance, ['delete', arg])
      },

      get $axios () {
        return self.axiosInstance
      },

      get $http () {
        return self.axiosInstance
      }
    }
  }

  function axiosInstanceSetCustomHelpers (self) {
    const instance = self.axiosInstance;

    // setHeader
    if (!instance.setHeader) {
      instance.setHeader = (nameOrObj, valueForName = null) => {
        if (typeof nameOrObj === 'object') {
          for (let item in nameOrObj) {
            set(item, nameOrObj[item]);
          }
        } else if (typeof nameOrObj === 'string') {
          set(nameOrObj, valueForName);
        }

        function set(key, val) {
          if (key === 'auth') {
            instance.setToken(val);
          } else {
            instance.defaults.headers[key] = val;
          }
        }

        return instance.defaults
      };

      // setToken(только если было объявлено setHeader)
      if (!instance.setToken) {
        instance.setToken = (token, type = 'Bearer') => {
          const value = !token ? null : (type ? type + ' ' : '') + token;

          return instance.setHeader('Authorization', value)
        };
      }
    }

    // deleteHeader
    if (!instance.deleteHeader) {
      instance.deleteHeader = arrOrKey => {
        if (typeof arrOrKey === 'object') {
          for (let key of arrOrKey) {
            deleteByKey(key);
          }
        } else if (typeof arrOrKey === 'string') {
          deleteByKey(arrOrKey);
        }

        function deleteByKey(key) {
          if (key === 'auth') {
            delete instance.defaults.headers['Authorization'];
          } else {
            delete instance.defaults.headers[key];
          }
        }

        return instance.defaults
      };
    }
  }

  function axiosInstanceSetInterceptors (self, interceptors) {
    // Add a request interceptor
    self.axiosInstance.interceptors.request.use(config => {
      if (interceptors.beforeRequest) {
        return interceptors.beforeRequest(config, self.axiosInstance) || config
      }

      // Do something before request is sent
      return config
    }, error => {
      if (interceptors.beforeRequestError) {
        interceptors.beforeRequestError(error, self.axiosInstance);
      }
      // Do something with request error
      return Promise.reject(error)
    });

    // Add a response interceptor
    self.axiosInstance.interceptors.response.use(response => {
      if (interceptors.beforeResponse) {
        interceptors.beforeResponse(response, self.axiosInstance);
      }
      // Do something with response data
      return response;
    }, error => {
      if (interceptors.beforeResponseError) {
        interceptors.beforeResponseError(error, self.axiosInstance);
      } else {
        // Do something with response error
        return Promise.reject(error);
      }
    });
  }

  return plugin;

})));
