function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function requestPromiseWrap(method, arg) {
  var _this = this;

  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _this[method].apply(_this, _toConsumableArray(arg));

            case 3:
              data = _context.sent.data;
              resolve(data);
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 7]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

var plugin = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var axios = options.axios,
        _options$config = options.config,
        config = _options$config === void 0 ? {} : _options$config,
        _options$interceptors = options.interceptors,
        interceptors = _options$interceptors === void 0 ? {} : _options$interceptors;
    if (!axios) throw new Error('Vue-axios-wrapper: please, specify in the settings your axios package.');
    var module = new Module(axios, config, {
      interceptors: interceptors
    });
    Object.assign(Vue.prototype, module);
  }
};

function Module(axiosPackage, config, other) {
  var self = this;
  self.axiosInstance = axiosPackage.create(config); // расширяет

  axiosInstanceSetCustomHelpers(self); // разрешает пользовательские interceptors

  axiosInstanceSetInterceptors(self, other.interceptors); // TODO $post, $get... и т.д добавлять в этот объект через цикл!
  // const requests = ['post', 'get', 'put', 'patch', 'delete', 'head', 'options']
  // const requestsObj = {}
  //
  // requests.forEach(name => {
  //   Object.defineProperty(requestsObj, '$' + name, {
  //     get: () => {
  //       return (...arg) => requestPromiseWrap.apply(self.axiosInstance, [name, arg])
  //     }
  //   })
  // })

  var publicObj = {
    // ...requestsObj, // добавляет в публичный объект методы для удобных запросов, с легким получением data
    get $post() {
      return function () {
        for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
          arg[_key] = arguments[_key];
        }

        return requestPromiseWrap.apply(self.axiosInstance, ['post', arg]);
      };
    },

    get $get() {
      return function () {
        for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          arg[_key2] = arguments[_key2];
        }

        return requestPromiseWrap.apply(self.axiosInstance, ['get', arg]);
      };
    },

    get $put() {
      return function () {
        for (var _len3 = arguments.length, arg = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          arg[_key3] = arguments[_key3];
        }

        return requestPromiseWrap.apply(self.axiosInstance, ['put', arg]);
      };
    },

    get $patch() {
      return function () {
        for (var _len4 = arguments.length, arg = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          arg[_key4] = arguments[_key4];
        }

        return requestPromiseWrap.apply(self.axiosInstance, ['patch', arg]);
      };
    },

    get $delete() {
      return function () {
        for (var _len5 = arguments.length, arg = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          arg[_key5] = arguments[_key5];
        }

        return requestPromiseWrap.apply(self.axiosInstance, ['delete', arg]);
      };
    },

    get $head() {
      return function () {
        for (var _len6 = arguments.length, arg = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          arg[_key6] = arguments[_key6];
        }

        return requestPromiseWrap.apply(self.axiosInstance, ['head', arg]);
      };
    },

    get $options() {
      return function () {
        for (var _len7 = arguments.length, arg = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          arg[_key7] = arguments[_key7];
        }

        return requestPromiseWrap.apply(self.axiosInstance, ['options', arg]);
      };
    },

    get $axios() {
      return self.axiosInstance;
    },

    get $http() {
      return self.axiosInstance;
    }

  }; // console.log(publicObj)
  // public obj

  return publicObj;
}

function axiosInstanceSetCustomHelpers(self) {
  var instance = self.axiosInstance; // setHeader

  if (!instance.setHeader) {
    instance.setHeader = function (nameOrObj) {
      var valueForName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (_typeof(nameOrObj) === 'object') {
        for (var item in nameOrObj) {
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

      return instance.defaults;
    }; // setToken(только если было объявлено setHeader)


    if (!instance.setToken) {
      instance.setToken = function (token) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Bearer';
        var value = !token ? null : (type ? type + ' ' : '') + token;
        return instance.setHeader('Authorization', value);
      };
    }
  } // deleteHeader


  if (!instance.deleteHeader) {
    instance.deleteHeader = function (arrOrKey) {
      if (_typeof(arrOrKey) === 'object') {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = arrOrKey[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;
            deleteByKey(key);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
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

      return instance.defaults;
    };
  }
}

function axiosInstanceSetInterceptors(self, interceptors) {
  // Add a request interceptor
  self.axiosInstance.interceptors.request.use(function (config) {
    if (interceptors.beforeRequest) {
      return interceptors.beforeRequest(config, self.axiosInstance) || config;
    } // Do something before request is sent


    return config;
  }, function (error) {
    if (interceptors.beforeRequestError) {
      interceptors.beforeRequestError(error, self.axiosInstance);
    } // Do something with request error


    return Promise.reject(error);
  }); // Add a response interceptor

  self.axiosInstance.interceptors.response.use(function (response) {
    if (interceptors.beforeResponse) {
      interceptors.beforeResponse(response, self.axiosInstance);
    } // Do something with response data


    return response;
  }, function (error) {
    if (interceptors.beforeResponseError) {
      interceptors.beforeResponseError(error, self.axiosInstance);
    } else {
      // Do something with response error
      return Promise.reject(error);
    }
  });
} // Auto-install


var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
