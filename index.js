'use strict'

const { buildSchema } = require('graphql')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const dotenv = require('dotenv')
const { readFileSync } = require('fs')
const { join } = require('path')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Read schema from lib/schema.graphql
const schema = buildSchema(
  readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf8')
)

// Configure resolvers
const resolvers = {
  hello: () => 'Hello world!'
}

// Use GraphQL middleware with express (express-graphql)
// schema goes in schema, resolvers goes in rootValue, and graphiql is the development environment
app.use(
  '/api',
  gqlMiddleware({
    schema,
    rootValue: resolvers,
    graphiql: true
  })
)

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
)
