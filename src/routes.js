import React from "react";
import Home from "./pages/home";
import PoemEditor from "./pages/editor/poems";
import { Route } from "react-router-dom";
import Poems from "./pages/poems";

const defaultRoutes = [
    {
        path: "/",
        component: Home,
        exact: true
    },
    {
        path: "/poems",
        component : Poems,
        exact: true
    },
    {
        path: "/poems/write",
        component: PoemEditor,
        exact: true,
    },
    {
        path: "/poems/write/:id",
        component: PoemEditor,
        exact: true,
    }
]


function buildRoute(routeObject, index){
    return (<Route path = {routeObject.path} component={routeObject.component} exact={routeObject.exact} key={index}></Route>)
}

function getRoutes(){
    const routeObjects = [...defaultRoutes];
    return routeObjects.map((routeObject, index) => buildRoute(routeObject, index))
}

export {getRoutes};