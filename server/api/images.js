const fetch = require('isomorphic-unfetch')
const cache = require('../cache').cache

/* eslint-disable require-jsdoc */
async function routes (fastify, options) {
  fastify.get('/api/item/:name/thumb/', async (request, reply) => {
    const name = request.params.name
    const fullUrl = request.raw.url
    let thumbnailUrl
    if (!cache.has(fullUrl)) {
      console.log(`${fullUrl} not found in cache`)
      const search = await fetch(`https://starwars.wikia.com/api/v1/Search/List/?limit=1&query=${encodeURIComponent(name)}`)
      const searchJson = await search.json()
      if (searchJson.items) {
        const articleId = searchJson.items && searchJson.items[0].id
        const article = await fetch(`https://starwars.wikia.com/api/v1/Articles/Details/?ids=${articleId}`)
        const articleJson = await article.json()
        thumbnailUrl = {
          thumbnailUrl: articleJson.items[articleId].thumbnail
        }
      } else {
        thumbnailUrl = {
          thumbnailUrl: 'https://vignette.wikia.nocookie.net/starwars/images/0/0c/Midibp.jpg/revision/latest/window-crop/width/200/x-offset/11/y-offset/0/window-width/381/window-height/380'
        }
      }
      cache.set(fullUrl, thumbnailUrl)
      console.log('************ BEGIN: images 29 ************')
      console.dir(cache.length, { colors: true, depth: 16 })
      console.log('************ END:   images 29 ************')
    } else {
      console.log(`${fullUrl} found in cache`)
      thumbnailUrl = cache.get(fullUrl)
    }
    return thumbnailUrl
  })

  fastify.get('/api/section/:sectionId/thumb/', async (request, reply) => {
    const sectionId = request.params.sectionId
    const fullUrl = request.raw.url
    let thumbnailUrl
    if (!cache.has(fullUrl)) {
      console.log(`${fullUrl} not found in cache`)
      const section = await fetch(`https://swapi.co/api/${sectionId}/`)
      const sectionJson = await section.json()
      const firstItem = sectionJson.results[0]
      const firstContentName = firstItem.name || firstItem.title
      const search = await fetch(`https://starwars.wikia.com/api/v1/Search/List/?limit=1&query=${encodeURIComponent(firstContentName)}`)
      const searchJson = await search.json()
      if (searchJson.items) {
        const articleId = searchJson.items && searchJson.items[0].id
        const article = await fetch(`https://starwars.wikia.com/api/v1/Articles/Details/?ids=${articleId}`)
        const articleJson = await article.json()
        thumbnailUrl = {
          thumbnailUrl: articleJson.items[articleId].thumbnail
        }
      } else {
        thumbnailUrl = {
          thumbnailUrl: 'https://vignette.wikia.nocookie.net/starwars/images/0/0c/Midibp.jpg/revision/latest/window-crop/width/200/x-offset/11/y-offset/0/window-width/381/window-height/380'
        }
      }
      cache.set(fullUrl, thumbnailUrl)
      console.log('************ BEGIN: images 64 ************')
      console.dir(cache.length, { colors: true, depth: 16 })
      console.log('************ END:   images 64 ************')
    } else {
      console.log(`${fullUrl} found in cache`)
      thumbnailUrl = cache.get(fullUrl)
    }
    return thumbnailUrl
  })
}

module.exports = routes
