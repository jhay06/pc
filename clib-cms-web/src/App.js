import React from 'react';
import AppRoutes from './AppRoutes';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  request: (operation) => {
    const token = sessionStorage.AUTH_TOKEN;
    operation.setContext({
      headers: {
        authorization: token || '',
      },
    });
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppRoutes />;
    </ApolloProvider>
  );
};

export default App;
