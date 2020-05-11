import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "src/Routes/Login";
import PhoneLogin from "src/Routes/PhoneLogin";
import VerifyPhone from "src/Routes/VerifyPhone";
import SocialLogin from "src/Routes/SocialLogin";

const LoggedOutRoutes: React.SFC = () => {
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
