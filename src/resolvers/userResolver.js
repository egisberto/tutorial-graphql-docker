const { PubSub } = require('graphql-subscriptions')
const { faker } = require('@faker-js/faker')
const { connectToDatabase } = require('../repositories/mongodb')

const pubsub = new PubSub()
const NEW = 'newUser'

module.exports = {
  userResolver: {
    Query: {
      users: async (_, { limit = 10, offset = 0, sort = { _id: 'asc' } }) => {
        const db = await connectToDatabase()
        const users = await db.collection('users').find({}, { limit, offset, sort }).toArray()
        return users
      }
    },

    Mutation: {
      userCreate: async (_, { user }) => {
        const db = await connectToDatabase()
        const date = new Date()
        const _id = (await db.collection('users').insertOne({ ...user, createdAt: date, updatedAt: date })).insertedId

        return { ...user, _id }
      },
      createFakeUsers: async (_, { quantity }) => {
        const db = await connectToDatabase()
        const date = new Date()

        for (let index = 0; index < quantity; index++) {
          db.collection('users').insertOne({
            name: faker.name.findName(),
            email: faker.internet.email(),
            gender: faker.name.gender(true),
            birthDate: faker.date.birthdate(),
            createdAt: date,
            updatedAt: date
          })
        }
      }
    },

    Subscription: {
      userAdded: {
        subscribe: () => pubsub.asyncIterator(NEW)
      }
    }
  }
}
