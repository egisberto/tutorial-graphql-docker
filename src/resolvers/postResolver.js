/* eslint-disable no-template-curly-in-string */
const { PubSub } = require('graphql-subscriptions')
const { faker } = require('@faker-js/faker')
const { connectToDatabase } = require('../repositories/mongodb')

const pubsub = new PubSub()
const NEW = 'newPost'

module.exports = {
  postResolver: {
    Query: {
      posts: async (_, { limit = 10, offset = 0, textSearch = '', sort }) => {
        const db = await connectToDatabase()
        let posts = null
        if (textSearch) {
          posts = await db.collection('posts').find(
            { $text: { $search: `${textSearch}` } },
            {
              limit,
              offset,
              project: !sort ? { score: { $meta: 'textScore' } } : {},
              sort: !sort ? { score: { $meta: 'textScore' } } : {}
            }
          ).toArray()
        } else {
          posts = await db.collection('posts').find({}, { limit, offset, sort }).toArray()
        }

        return posts
      },
      post: async (_, { _id }) => {
        const db = await connectToDatabase()
        const post = await db.collection('posts').findOne({ _id })

        return post
      }
    },

    Mutation: {
      postCreate: async (_, { post }) => {
        const db = await connectToDatabase()
        const date = new Date()
        const _id = (await db.collection('posts').insertOne({ ...post, createdAt: date, updatedAt: date })).insertedId

        return { ...post, createdAt: date, updatedAt: date, _id }
      },
      createFakePosts: async (_, { quantity }) => {
        const db = await connectToDatabase()
        const date = new Date()

        for (let index = 0; index < quantity; index++) {
          db.collection('posts').insertOne({
            title: faker.lorem.sentence(faker.helpers.arrayElement([1, 2, 3, 4, 5])),
            content: faker.lorem.paragraphs(faker.helpers.arrayElement([1, 2, 3, 4, 5])),
            author: {
              name: faker.name.findName(),
              email: faker.internet.email()
            },
            createdAt: date,
            updatedAt: date
          })
        }
      }
    },

    Subscription: {
      postAdded: {
        subscribe: () => pubsub.asyncIterator(NEW)
      }
    }
  }
}
