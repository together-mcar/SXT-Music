const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
require('dotenv').config()
const bodyParser = require('body-parser')
// const api = require('./routers')
// const compression = require('compression')

// const httpClient = require('@huaying/hycommon/lib/httpClient')
// const realIp = require('@huaying/hycommon/middleware/realIp')(httpClient)
// const pbJson = require('./middleware/pb')

const app = express()

const port = process.env.PORT || 8383

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// if (!config.dev) {
//   app.use(realIp)
// }
app.use(bodyParser.json())
// app.use('/static', express.static('static'))
// app.use('/static-h5', express.static('.nuxt/dist/client'))
// app.use('/static-h5', express.static('.nuxt/dist/server'))

// app.use(pbJson)

// app.use(compression())

// Import API Routes
// app.use('/api-H5', api)

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
} else {
  nuxt.ready()
}

// Give nuxt middleware to express
app.use(nuxt.render)
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  if (req.xhr) {
    const { resultCode, resultInfo } = Object.assign({}, err.response, { resultCode: 0, resultInfo: '' })
    if (err.name === 'BackendRequestError') {
      // reptile invaild time to cath  node err
      const isInvalidTime = resultCode === 10008 && (resultInfo.includes('Too') || resultInfo.includes('ongoingBeginTime'))
      if (isInvalidTime) {
        res.status(401).send({
          msg: resultInfo
        })
      } else {
        console.error(err.response)
        const invalidTokenCode = [11006, 11007, 11008]
        if (invalidTokenCode.indexOf(resultCode) !== -1) {
          // res.clearCookie('jwt')
        }
        res.json(err.response)
      }
    } else if (err.name === 'UnauthorizedError') {
      res.status(401).send({
        msg: 'invalid token'
      })
    } else {
      err.resultInfo = '服务器错误'
      console.error(err)
      res.json(err)
    }
  } else {
    res.send(config.dev ? err.message : '服务器开小差了')
  }
})

// Listen the server
app.listen(port)
consola.ready({
  message: `Server listening on http://localhost:${port}`,
  badge: true
})
