const routes = require('next-routes')

module.exports = routes()
  .add('home', '/', 'sections/films')
  // .add('films', '/films', 'sections/films')
  .add('people', '/people', 'sections/people')
  .add('starships', '/starships', 'sections/starships')
  .add('planets', '/planets', 'sections/planets')
  .add('vehicles', '/vehicles', 'sections/vehicles')
  .add('species', '/species', 'sections/species')

  .add('people-detail', '/people/:id', 'details/character')
  .add('films-detail', '/films/:id', 'details/film')
