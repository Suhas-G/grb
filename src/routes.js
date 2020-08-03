import React from "react";
import Home from "./pages/home";
import PoemEditor from "./pages/editor/poems";
import { Route } from "react-router-dom";
import PrivateRoute from "./components/common/privateRoute";
import Poems from "./pages/poems";
import Poem from "./pages/poems/poem";

const defaultRoutes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/poems",
    component: Poems,
    exact: true,
  },
  {
    path: "/poems/:id",
    component: Poem,
    exact: true,
  },
  {
    path: "/poems/:id/edit",
    component: PoemEditor,
    exact: true,
    authorise: true
  },
  {
    path: "/write/poems",
    component: PoemEditor,
    exact: true,
    authorise: true,
  },
];

function buildRoute(routeObject, index) {
  const route = routeObject.authorise ? (
    <PrivateRoute
      path={routeObject.path}
      component={routeObject.component}
      exact={routeObject.exact}
      key={index}
    ></PrivateRoute>
  ) : (
    <Route
      path={routeObject.path}
      component={routeObject.component}
      exact={routeObject.exact}
      key={index}
    ></Route>
  );
  return route;
}

function getRoutes() {
  const routeObjects = [...defaultRoutes];
  return routeObjects.map((routeObject, index) =>
    buildRoute(routeObject, index)
  );
}

export { getRoutes };
