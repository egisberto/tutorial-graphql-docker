const { connectToDatabase } = require('../repositories/mongodb')
const { ObjectId } = require('mongodb')

module.exports = {
  commentResolver: {
    Query: {
      comments: async (_, args) => {
        const db = await connectToDatabase()
        const users = await db.collection('commets').find({}).toArray()
        return users
        // const { limit, ...rest } = args
        // return await db.Comment.findAll({
        //   limit: limit || 20,
        //   order: [['updatedAt', 'desc']],
        //   where: { ...rest },
        //   include: [db.Post, db.User]
        // })
      }
    },

    Mutation: {
      commentCreate: async (_, { comment }) => {
        const { author, postId, content } = comment
        const db = await connectToDatabase()

        const date = new Date()
        await db.collection('posts')
          .findOneAndUpdate(
            { _id: new ObjectId(postId) },
            { $push: { comments: { content, author, createdAt: date, updatedAt: date } } }
          )

        return { content, author }
      }
    },

    Subscription: {
      commentAdded: {
        // subscribe: withFilter(
        //   () => pubsub.asyncIterator(NEW),
        //   (payload, variables) => {
        //     return (payload.commentAdded.postGid === variables.postGid)
        //   }
        // )
      }
    }
  }
}
