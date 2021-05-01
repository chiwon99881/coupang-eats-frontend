import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import App from './App';
import { client } from './apollo';
import { ApolloProvider } from '@apollo/client';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
