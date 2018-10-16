export function requestPromiseWrap (method, arg) {
  return this[method](...arg)
    .then(({ data }) => data)
    // .catch(e => {
    //   // throw e
    // })
}
