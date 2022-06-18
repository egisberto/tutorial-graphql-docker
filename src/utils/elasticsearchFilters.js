module.exports = {
  states: (data) => {
    return { terms: { 'state_name.keyword': data } }
  },
  pharmacies: (data) => {
    return { terms: { 'pharmacy_name.keyword': data } }
  }
}
