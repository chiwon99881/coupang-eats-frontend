import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../pages/commons/home';
import { Header } from '../pages/commons/header';
import { NotFound } from '../pages/commons/404';
import { Search } from '../pages/commons/search';
import { DishDetail } from '../pages/commons/dish-detail';
import { BrowserRouter as Router } from 'react-router-dom';
import { MyFavFood } from '../pages/commons/my-fav-food';

const LoggedInRoutes = () => (
  <>
    <Header />
    <Switch>
      <Route path={'/'} exact={true}>
        <Home />
      </Route>
      <Route path={'/search'} exact={true}>
        <Search />
      </Route>
      <Route path={'/dish/:id'} exact={true}>
        <DishDetail />
      </Route>
      <Route path={'/my-fav'} exact={true}>
        <MyFavFood />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </>
);

export const LoggedInRouter = () => (
  <Router>
    <LoggedInRoutes />
  </Router>
);
