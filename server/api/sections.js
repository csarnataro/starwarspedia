const fetch = require('isomorphic-unfetch')
const cache = require('../cache').cache
const asyncMiddleware = require('../../utils/asyncMiddleware')

const routes = require('express').Router()

routes.get('/:section/', asyncMiddleware(async (req, res) => {
  const fullUrl = req.originalUrl
  const section = req.params.section
  let items
  if (!cache.has(fullUrl)) {
    console.log(`${fullUrl} not found in cache`)
    const filmsRequest = await fetch(`https://swapi.co/api/${section}/`)
    const filmsResponse = await filmsRequest.json()
    items = filmsResponse.results
    cache.set(fullUrl, items)
  } else {
    console.log(`${fullUrl} found in cache`)
    items = cache.get(fullUrl)
  }
  res.json(items)
}))

routes.get('/:section/:id', async (req, res) => {
  const fullUrl = req.originalUrl
  const id = req.params.id
  const section = req.params.section
  let item
  if (!cache.has(fullUrl)) {
    console.log(`${fullUrl} not found in cache`)
    const filmReq = await fetch(`https://swapi.co/api/${section}/${id}/`)
    item = await filmReq.json()
    cache.set(fullUrl, item)
  } else {
    console.log(`${fullUrl} found in cache`)
    item = cache.get(fullUrl)
  }
  res.json(item)
})

module.exports = routes
