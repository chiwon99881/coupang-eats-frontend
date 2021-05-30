import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { isLoggedVar } from './apollo';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';
import * as dotenv from 'dotenv';
dotenv.config();

function App() {
  const isLoggedIn: boolean = useReactiveVar(isLoggedVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
