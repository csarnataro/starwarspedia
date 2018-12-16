const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('API v1.0.0')
})

router.use('/pics', require('./images'))
router.use('/', require('./sections'))

module.exports = router
