import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  createHttpLink,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';

const token = localStorage.getItem('token');
export const isLoggedVar = makeVar(Boolean(token));
export const authToken = makeVar(token);

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      'x-jwt': authToken() || '',
    },
  },
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
    User: {
      fields: {
        favFood: {
          merge: false,
        },
      },
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache,
});
