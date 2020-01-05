'use strict';

// Import basic dependecies
// Env
require('dotenv').config();
const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const cors = require('cors');
const gqlMiddleware = require('express-graphql');
const resolvers = require('./lib/resolvers');

// Reading
const { readFileSync } = require('fs');
const { join } = require('path');

/// /// Configure server //////
const app = express();
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

// Read schema from lib/schema.graphql
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf8');
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Middlewares
app.use(cors());

// Use GraphQL middleware with express (express-graphql)
// schema goes in schema, resolvers goes in rootValue, and graphiql is the development environment
app.use(
	'/api',
	gqlMiddleware({
		schema,
		rootValue: resolvers,
		graphiql: isDev
	})
);

app.listen(port, () =>
	console.log(`Server listening at http://localhost:${port}`)
);
