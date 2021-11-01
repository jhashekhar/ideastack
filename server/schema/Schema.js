const { gql } = require("apollo-server")

// schema 
const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String
    user: User
  }
  
  type Query {
    info: String!
    books: [Book]
    getBook(id: ID!): Book
    getUser(email: String!): User
  }

  type Mutation {
    register(name: String, email: String, password: String): AuthPayload
    signIn(email: String, password: String): AuthPayload
    addBook(title: String, author: String): Book
  }
`

module.exports = {
  typeDefs,
}
