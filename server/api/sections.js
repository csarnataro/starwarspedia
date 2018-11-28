const fetch = require('isomorphic-unfetch')
const cache = require('../cache').cache

/* eslint-disable require-jsdoc */
async function routes (fastify, options) {
  fastify.get('/api/:section/:id/', async (request, reply) => {
    console.log('************ BEGIN: films 25 ************')
    console.dir(request.raw.url, { colors: true, depth: 16 })
    console.log('************ END:   films 25 ************')
    const fullUrl = request.raw.url
    const id = request.params.id
    const section = request.params.section
    let film
    if (!cache.has(fullUrl)) {
      console.log(`${fullUrl} not found in cache`)
      const filmReq = await fetch(`https://swapi.co/api/${section}/${id}/`)
      film = await filmReq.json()
      cache.set(fullUrl, film)
      console.log('************ BEGIN: sections 21 ************')
      console.dir(cache.length, { colors: true, depth: 16 })
      console.log('************ END:   sections 21 ************')
    } else {
      console.log(`${fullUrl} found in cache`)
      film = cache.get(fullUrl)
    }
    return film
  })
  fastify.get('/api/:section/', async (request, reply) => {
    const fullUrl = request.raw.url
    const section = request.params.section
    let films
    if (!cache.has(fullUrl)) {
      console.log(`${fullUrl} not found in cache`)
      const filmsRequest = await fetch(`https://swapi.co/api/${section}/`)
      const filmsResponse = await filmsRequest.json()
      films = filmsResponse.results
      cache.set(fullUrl, films)
      console.log('************ BEGIN: sections 40 ************')
      console.dir(cache.length, { colors: true, depth: 16 })
      console.log('************ END:   sections 40 ************')
    } else {
      console.log(`${fullUrl} found in cache`)
      films = cache.get(fullUrl)
    }
    return films
  })
}

module.exports = routes
