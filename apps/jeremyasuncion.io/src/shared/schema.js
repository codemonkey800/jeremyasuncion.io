import { makeExecutableSchema } from 'graphql-tools';

export const typeDefs = `
  type Query {
    hello: String!
  }
`;

export const resolvers = {
  Query: {
    hello: () => 'hello world!',
  },
};

export default makeExecutableSchema({ resolvers, typeDefs });

