import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../pages/commons/home';
import { Header } from '../pages/commons/header';
import { NotFound } from '../pages/commons/404';

const LoggedInRoutes = () => (
  <Switch>
    <Route path={'/'} exact={true}>
      <Home />
    </Route>
    <Route path={'*'}>
      <NotFound />
    </Route>
  </Switch>
);

export const LoggedInRouter = () => (
  <>
    <Header />
    <LoggedInRoutes />
  </>
);
