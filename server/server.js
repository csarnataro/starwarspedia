const fastify = require('fastify')({
  logger: {
    level: 'warn',
    file: './server.log' // will use pino.destination()
  }
})
const Next = require('next')
const path = require('path')
const routes = require('../common/routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/assets/' // optional: default '/'
})

// fastify.addHook('preHandler', (request, reply, done) => {
//   request.log.error(`feat-1234[${request.headers['feat-1234']}]`)
//   done()
// })

fastify.register((fastify, opts, next) => {
  const app = Next({ dev })
  const handler = routes.getRequestHandler(app)
  fastify.use(handler)

  app.prepare()
    .then(() => {
      if (dev) {
        fastify.get('/_next/*', (req, reply) => {
          return app.handleRequest(req.req, reply.res)
            .then(() => {
              reply.sent = true
            })
        })
      }

      fastify.get('/*', (req, reply) => {
        return app.handleRequest(req.req, reply.res)
          .then(() => {
            reply.sent = true
          })
      })

      fastify.setNotFoundHandler((request, reply) => {
        return app.render404(request.req, reply.res)
          .then(() => {
            reply.sent = true
          })
      })

      next()
    })
    .catch((err) => next(err))
})

fastify.register(require('./api/sections'))
fastify.register(require('./api/images'))

fastify.listen(port, '0.0.0.0', (err, address) => {
  if (err) throw err
  console.log(`> Ready on ${address}`)
})
