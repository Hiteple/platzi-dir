'use strict';

// Import basic dependecies
const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const gqlMiddleware = require('express-graphql');
const resolvers = require('./lib/resolvers');

// Reading
const { readFileSync } = require('fs');
const { join } = require('path');

// Env
const dotenv = require('dotenv');

dotenv.config();

/// /// Configure server //////
const app = express();
const port = process.env.PORT || 3000;

// Read schema from lib/schema.graphql
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf8');
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Use GraphQL middleware with express (express-graphql)
// schema goes in schema, resolvers goes in rootValue, and graphiql is the development environment
app.use(
	'/api',
	gqlMiddleware({
		schema,
		rootValue: resolvers,
		graphiql: true
	})
);

app.listen(port, () =>
	console.log(`Server listening at http://localhost:${port}`)
);
