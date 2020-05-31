import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "src/Routes/Home";
import Ride from "src/Routes/Ride";
import Chat from "src/Routes/Chat";
import EditAccount from "src/Routes/EditAccount";
import Places from "src/Routes/Places";
import AddPlace from "src/Routes/AddPlace";
import Settings from "src/Routes/Settings";
import FindAddress from "src/Routes/FindAddress";

interface IProps {
  isLoading: boolean;
}

const LoggedInRoutesPresenter: React.SFC<IProps> = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <Switch>
          <Route path={"/"} exact={true} component={Home} />
          <Route path={"/ride/:rideId"} exact={true} component={Ride} />
          <Route path={"/chat/:chatId"} exact={true} component={Chat} />
          <Route path={"/edit-account"} exact={true} component={EditAccount} />
          <Route path={"/settings"} exact={true} component={Settings} />
          <Route path={"/places"} exact={true} component={Places} />
          <Route path={"/add-place"} exact={true} component={AddPlace} />
          <Route path={"/find-address"} exact={true} component={FindAddress} />
          <Redirect from={"*"} to={"/"} />
        </Switch>
      )}
    </>
  );
};

export default LoggedInRoutesPresenter;
