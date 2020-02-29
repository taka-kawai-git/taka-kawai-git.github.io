'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_SERVICE_NAME: 'Company',
  VUE_APP_NUM_SHARD: 10,
  VUE_APP_MAX_NUM_COMMENTS: 1000
})
