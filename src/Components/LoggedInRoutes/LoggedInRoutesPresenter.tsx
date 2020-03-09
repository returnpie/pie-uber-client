import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../../Routes/Home";
import Ride from "../../Routes/Ride";
import EditAccount from "../../Routes/Login";
import Places from "../../Routes/Places";
import AddPlace from "../../Routes/AddPlace";
import Settings from "../../Routes/Settings";
import FindAddress from "../../Routes/FindAddress";

const LoggedInRoutesPresenter = () => {
  return (
    <Switch>
      <Route path={"/"} exact={true} component={Home} />
      <Route path={"/ride"} exact={true} component={Ride} />
      <Route path={"/edit-account"} exact={true} component={EditAccount} />
      <Route path={"/settings"} exact={true} component={Settings} />
      <Route path={"/places"} exact={true} component={Places} />
      <Route path={"/add-place"} exact={true} component={AddPlace} />
      <Route path={"/find-address"} exact={true} component={FindAddress} />
      <Redirect from={"*"} to={"/"} />
    </Switch>
  );
};

export default LoggedInRoutesPresenter;
