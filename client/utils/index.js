import Long from 'long'
export const cookieToJson = cookie => {
  if (!cookie) return false
  const obj = {}
  cookie.split(';').forEach((i) => {
    const arr = i.split('=')
    obj[arr[0].trim()] = arr[1]
  })
  return obj
}

export const initCookie = key => {
  // var value = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
  var value = decodeURIComponent(key)
  if(value && value.startsWith("{") && value.endsWith("}")) {
    try {
        value = JSON.parse(value)
    }catch (e) {
        return value
    }
  }
  return value
}

export const longToNumber = obj => {
  if (Object.prototype.toString.call(obj) === '[object Object]' && obj.low) {
    return new Long(obj.low, obj.high, obj.unsigned).toNumber()
  }
  return obj
}
