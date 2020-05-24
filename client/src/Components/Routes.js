import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Common/Home";
import Error from "./Common/Error";
import Login from "./Login/Login";
import Register from "./Login/Register";
import UserView from "./User/UserView";

const Routes = () => {
  return (
    <Switch>
      <Route path="/users" component={UserView} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/not-found" component={Error} />
      <Route path="/" exact component={Home} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
