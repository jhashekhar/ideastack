const dotenv = require("dotenv")
const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const bcrypt = require("bcrypt")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")
const { typeDefs } = require("../schema/Schema.js")
const { getUserId } = require("./utils.js")

const prisma = new PrismaClient()

const PORT = 4000
dotenv.config()

// resolver is a function that's responsible for populating the data for a single
// field in your schema
async function startApolloServer() {
  const resolvers = {
    Query: {
      info: () => "This is my reading list!",
      
      books: async (parent, args, context) => {
        return context.prisma.book.findMany()
      },
      
      getBook: async (parent, args, context) => {
        const book = await context.prisma.book.findUnique({
          where: { id: +args.id }
        })
        return book
      },
      
      getUser: async (parent, args, context) => {
        const user = await context.prisma.user.findUnique({
          where: { email: args.email }
        })
        return user
      },
      
    },

    Mutation: {
      addBook: async (parent, args, context, info) => {
        // get user Id
        const { userId } = context
        const newBook = await context.prisma.book.create({
          data: {
            title: args.title,
            author: args.author,
          },
        })
        console.log("Authentication: ", args, userId)
        return newBook
      },
    
      signIn: async (parent, args, context, info) => {
        const { email, password } = args
        // check if email exists
        const user = await context.prisma.user.findUnique({ where: { email }, })
        
        if (!user) return "No such user found!"

        if (user) {
          const match = await bcrypt.compare(password, user.password)
          if (match) {
            const token = jwt.sign({ email }, process.env.SECRET_KEY)
            console.log("User and token ", {token, user})
            return {token, user}
          } else return null
        }
      },
        
      register: async (parent, args, context, info) => {
        const { name, email, password } = args
          
        // search if the email is already in the database i.e. registered
        const user = await context.prisma.user.findUnique({
          where: { email },
        })

        // if the email is not registerd then create the new user
        if (!user) {
          // hash the passwords
          const hash = await bcrypt.hash(password, 12)
          // create the new user 
          const newUser = await context.prisma.user.create({
            data: { name, email, password: hash },
          })
          const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY)
          return {token, newUser}
        } else {
          console.log("The email is already registered!")
        }
      },
    }
  }

  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => {
      //console.log("This is req", req.headers.authorization)
      
      const userId = req && req.headers.authorization ? getUserId(req) : null
      console.log("This is userId ", userId)
      return {
        ...req,
        prisma,
        userId
      }
    }
  })

  await server.start()

  const app = express()
  app.use(cors())
  server.applyMiddleware({ app })

  app.listen(
    PORT, 
    () => console.log(`🚀 Server is running at http://localhost/${PORT}${server.graphqlPath}`))
}

startApolloServer()
