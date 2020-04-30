import qs from 'qs'
import crypto from '~/plugins/crypto'
import { LOCAL_API } from '~/utils/localApi.js'

const API_SECRET = process.env.API_SECRET

export default ({ $axios, redirect, app, error }) => {
  $axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
  $axios.setHeader(
    'Content-Type',
    'application/x-www-form-urlencoded',
    ['post']
  )
  $axios.onRequest(config => {
    let urlHead = process.env.API_URL
    Object.keys(LOCAL_API).forEach(item => {
      if (config.url === LOCAL_API[item]) {
        urlHead = process.env.LOCAL_URL
      }
    })
    config.url = `${urlHead}${config.url}`
    const timestamp = new Date().getTime()
    const param = `timestamp=${timestamp}&secret=${API_SECRET}`
    const sign = crypto(param)
    if (config.method !== 'post') {
      config.data = qs.stringify(config.data, {
        allowDots: true
      })
    }
    config.params = Object.assign({}, config.params, { timestamp, sign })
    return config
  })

  $axios.onResponse(res => {
    return Promise.resolve(res)
  })
  $axios.onError(err => {
    let msg = ''
    const response = err.response
    const code = parseInt(response && response.status) || ''
    switch (code) {
      case 404:
        msg = 'Interface 404'
        break
      case 500:
        msg = response && response.data
        break
      default:
        msg = ''
    }
    // context err format
    const { request, ...other } = response
    const error = { statusCode: code, message: msg, ...other }
    console.log('Catch axios error: ', error)
    return msg === '' ? Promise.reject(err) : Promise.reject(error)
    // Ps:
    // app.$toast('Toast error text') // only toast error
    // app.context.error(error) // jump to error-page
  })
  $axios.onRequestError(err => {
    console.log('Catch onRequestError!!!', err)
    return Promise.reject(err)
  })
  $axios.onResponseError(err => {
    console.log('Catch onResponseError!!!', err)
    return Promise.reject(err)
  })
}
