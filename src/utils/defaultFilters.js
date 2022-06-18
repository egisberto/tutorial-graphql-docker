const { isEmpty, isArray, mergeWith } = require('lodash')
const {
  states,
  pharmacies
} = require('./elasticsearchFilters')

function customizer (objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

module.exports = (defaultQuery, filters) => {
  const queryFilters = []

  if (!isEmpty(filters.states)) {
    queryFilters.push(states(filters.states))
  }

  if (!isEmpty(filters.pharmacies)) {
    queryFilters.push(pharmacies(filters.pharmacies))
  }

  return mergeWith(
    JSON.parse(JSON.stringify(defaultQuery)),
    {
      bool: {
        filter: queryFilters
      }
    },
    customizer
  )
}
