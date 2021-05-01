import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { isLoggedVar } from './apollo';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';

function App() {
  const isLoggedin: boolean = useReactiveVar(isLoggedVar);

  return isLoggedin ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
