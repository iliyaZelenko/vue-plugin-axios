export function requestPromiseWrap (method, arg) {
  return this[method](...arg)
    .then(({ data }) => data)
    // .catch(e => {
    //   // throw e
    // }) // или просто убрать catch

  // return new Promise(async (resolve, reject) => {
  //   try {
  //     const data = await this[method](...arg)
  //
  //     resolve(data.data)
  //   } catch (e) {
  //     console.log(e)
  //     reject(e)
  //   }
  // })
}
