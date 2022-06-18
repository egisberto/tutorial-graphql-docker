const { gql } = require('apollo-server')

const typeDefs = gql`
  scalar Date
  scalar Object

  enum Gender {
    Male
    Female
    Undisclosed
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    gender: Gender
    birthDate: Date
    createdAt: Date
    updatedAt: Date
  }

  type UserData {
    name: String!
    email: String!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: UserData!
    comments: [Comment]
    createdAt: Date!
    updatedAt: Date!
  }

  type Comment {
    content: String!
    author: UserData!
    createdAt: Date
    updatedAt: Date
  }

  input UserDataInput {
    name: String!
    email: String!
  }

  input UserCreateInput {
    name: String!
    email: String!
    phone: String!
    gender: Gender
    birthDate: Date
  }

  input UserUpdateInput {
    name: String
    email: String
    phone: String
    gender: Gender
    birthDate: Date
  }

  input PostCreateInput {
    title: String!
    content: String!
    author: UserDataInput!
  }

  input CommentCreateInput {
    content: String!
    postId: String!
    author: UserDataInput!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users(limit: Int, offset: Int, sort: Object): [User]
    posts(limit: Int, offset: Int, sort: Object): [Post]
    post(_id: ID): Post
    comments(postGid: ID): [Comment]
  }

  type Subscription {
    userAdded: User
    postAdded: Post
    commentAdded(postGid: ID!): Comment
  }

  type Mutation {
    createFakeUsers(quantity: Int!): Boolean
    createFakePosts(quantity: Int!): Boolean
    createFakeComments(quantity: Int!): [Comment]
    userCreate(user: UserCreateInput! ): User
    userUpdate(userId: ID!, user: UserUpdateInput! ): User 
    postCreate(post: PostCreateInput): Post
    commentCreate(comment: CommentCreateInput): Comment
  }
`

module.exports = {
  typeDefs
}
