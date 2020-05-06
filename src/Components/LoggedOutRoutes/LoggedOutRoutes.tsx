import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../../Routes/Login";
import PhoneLogin from "../../Routes/PhoneLogin";
import VerifyPhone from "../../Routes/VerifyPhone";
import SocialLogin from "../../Routes/SocialLogin";

const LoggedOutRoutes = () => {
  return (
    <Switch>
      <Route path={"/"} exact={true} component={Login} />
      <Route path={"/phone-login"} component={PhoneLogin} />
      <Route path={"/verify-phone"} component={VerifyPhone} />
      <Route path={"/social-login"} component={SocialLogin} />
      <Redirect from={"*"} to={"/"} />
    </Switch>
  );
};

export default LoggedOutRoutes;
