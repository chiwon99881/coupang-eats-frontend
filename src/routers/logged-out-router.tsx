import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login } from '../pages/commons/login';

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact={true} path={'/'}>
      <Login />
    </Route>
  </Switch>
);

export const LoggedOutRouter = () => <LoggedOutRoutes />;
