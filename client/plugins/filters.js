import Vue from 'vue'
import Long from 'long'
import { mapper } from '~/utils/mapping.js'

export function toText (src, MD) {
  if (!src) return
  if (mapper[MD]) {
    const res = mapper[MD].find(item => {
      if (src === item.value) {
        return item
      }
    })
    return res.text
  } else {
    return ''
  }
}
/**
 * 格式化日期，fmt可任意组合
 * @param {Number} timestamp
 * @param {String} fmt
 */
export function formatDate (date, fmt = 'yyyy-MM-dd hh:mm') {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

function date (input, format = 'yyyy-MM-dd hh:mm') {
  if (!input) {
    return '00:00'
  }
  return formatDate(new Date(input), format)
}

function lineFeed (str) {
  if (str) {
    return str.toString().replace(/\↵/g, '<br/>')
  } else {
    return ''
  }
}

function initLyric (str) {
  if (str) {
    return str.toString().replace(/(\[.*\])/g, '\n')
  } else {
    return ''
  }
}

function initDjangoDate (input) {
  return input.split('T')[0]
}

const filters = {
  formatDate,
  date,
  lineFeed,
  initLyric,
  toText,
  initDjangoDate
}

function registerFilters () {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}

registerFilters()
