import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import App from './App';
import { client } from './apollo';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ToastContainer position={'top-center'} autoClose={2000} />
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
