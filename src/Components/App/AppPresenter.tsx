import React from "react";
import LoggedInRoutes from "../LoggedInRoutes";
import LoggedOutRoutes from "../LoggedOutRoutes";
import { BrowserRouter } from "react-router-dom";

interface Props {
  isLoggedIn: boolean;
}

const AppPresenter = (props: Props) => {
  const { isLoggedIn } = props;
  return (
    <BrowserRouter>
      {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
    </BrowserRouter>
  );
};

export default AppPresenter;
