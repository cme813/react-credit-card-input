
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-credit-card-input.cjs.production.min.js')
} else {
  module.exports = require('./react-credit-card-input.cjs.development.js')
}
