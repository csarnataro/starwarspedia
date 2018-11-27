const fastify = require('fastify')({ logger: { level: 'error' } })
const Next = require('next')
const routes = require('../common/routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

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

      // fastify.get('/people/:id', (req, reply) => {
      //   return app.render(req.req, reply.res, '/index', req.params)
      //     .then(() => {
      //       reply.sent = true
      //     })
      // })

      fastify.get('/*', (req, reply) => {
        console.log('************ BEGIN: server 36 ************')
        console.dir(req.raw, { colors: true, depth: 16 })
        console.log('************ END:   server 36 ************')

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

fastify.listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})
