import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const token = localStorage.getItem('token');
export const isLoggedVar = makeVar(Boolean(token));
export const authToken = makeVar(token);

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-jwt': authToken() || '',
    },
  };
});

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
  link: authLink.concat(httpLink),
  cache,
});
