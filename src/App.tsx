import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { isLoggedVar } from './apollo';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';

function App() {
  const isLoggedIn: boolean = useReactiveVar(isLoggedVar);
  console.log(isLoggedIn);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
