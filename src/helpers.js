export function requestPromiseWrap (method, arg) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await this[method](...arg)

      resolve(data.data)
    } catch (e) {
      console.log(e)
      reject(e)
    }
  })
}
