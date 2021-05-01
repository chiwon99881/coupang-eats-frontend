import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export const isLoggedVar = makeVar(
  localStorage.getItem('token') ? true : false
);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedVar: {
          read() {
            return isLoggedVar();
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache,
});
