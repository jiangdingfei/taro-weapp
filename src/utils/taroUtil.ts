import Taro from '@tarojs/taro'

export const getDomInfo = (ids, _this, env) => {
  const ENV = env || process.env.TARO_ENV
  const query = ENV === 'h5' ? Taro.createSelectorQuery().in(_this) : Taro.createSelectorQuery().in(_this.$scope)
  const IDS = typeof ids === 'string' ? [ids]: ids
  IDS.forEach(item => {
    query.select(item).boundingClientRect()
  })
  return new Promise((resolve,reject) => {
    try {
      query.exec(rects => {
        resolve(rects)
      })
    } catch(error) {
      reject(error)
    }
  })
}