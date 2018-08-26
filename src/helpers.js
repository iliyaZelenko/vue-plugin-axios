export function requestPromiseWrap (method, arg) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = (await this[method](...arg)).data

      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
}
