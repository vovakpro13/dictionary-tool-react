import React from 'react';
import {Switch, Route} from "react-router-dom";
import Home from "./Home";
import Camera from "./Camera";

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/camera" component={Camera}/>
        </Switch>
    );
};

export default Router;