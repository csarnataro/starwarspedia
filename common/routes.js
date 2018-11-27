const routes = require('next-routes')

module.exports = routes()
  .add('home', '/', 'sections/films')
  .add('films', '/films', 'sections/films')
  .add('people', '/people', 'sections/people')
  .add('starships', '/starships', 'sections/starships')
  .add('planets', '/planets', 'sections/planets')
  .add('vehicles', '/vehicles', 'sections/vehicles')
  .add('species', '/species', 'sections/species')

  .add('character details', '/people/:id', 'detail')
  .add('film details', '/films/:id', 'detail')
