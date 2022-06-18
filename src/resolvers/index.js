const { merge } = require('lodash')
const { userResolver } = require('./userResolver')
const { postResolver } = require('./postResolver')
const { commentResolver } = require('./commentResolver')

module.exports = merge(
  userResolver,
  postResolver,
  commentResolver
)
