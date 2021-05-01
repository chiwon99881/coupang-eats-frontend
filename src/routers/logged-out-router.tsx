import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from '../pages/commons/home';

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact={true} path={'/'}>
      <Home />
    </Route>
  </Switch>
);

export const LoggedOutRouter = () => <LoggedOutRoutes />;
