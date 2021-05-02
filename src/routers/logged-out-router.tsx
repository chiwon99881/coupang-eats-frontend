import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login } from '../pages/commons/login';
import { CreateAccount } from '../pages/commons/create-account';
import { NotFound } from '../pages/commons/404';

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact={true} path={'/'}>
      <Login />
    </Route>
    <Route exact={true} path={'/create-account'}>
      <CreateAccount />
    </Route>
    <Route path={'*'}>
      <NotFound />
    </Route>
  </Switch>
);

export const LoggedOutRouter = () => <LoggedOutRoutes />;
