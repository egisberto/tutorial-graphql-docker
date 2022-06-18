const { MongoClient } = require('mongodb')

// Connection URL
const url = 'mongodb://localhost:27017'

let cachedDb = null

async function connectToDatabase () {
  if (cachedDb) {
    return cachedDb
  }

  const connection = await MongoClient.connect(url)
  cachedDb = connection.db('demo')

  return cachedDb
}

module.exports = {
  connectToDatabase
}
