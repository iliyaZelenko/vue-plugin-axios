export function requestPromiseWrap (method, arg) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(arg)
      const data = (await this[method](...arg)).data

      resolve(data)
    } catch (e) {
      console.log(e)
      reject(e)
    }
  })
}
