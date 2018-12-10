// server.js
const next = require('next')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000

const app = next({ dev })

const routes = require('../common/routes')
const handler = routes.getRequestHandler(app)

// With express
const expressApp = express({ mergeParams: true })
expressApp.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
expressApp.use('/api', require('./api'))

app.prepare().then(() => {
  expressApp.use(handler).listen(port)
})
