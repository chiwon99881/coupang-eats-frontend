import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../pages/commons/home';

const LoggedInRoutes = () => (
  <Switch>
    <Route path={'/'} exact={true}>
      <Home />
    </Route>
  </Switch>
);

export const LoggedInRouter = () => <LoggedInRoutes />;
