import React from "react";
import { graphql } from "@apollo/react-hoc";
import { IS_LOGGED_IN } from "./AppQueries";
import AppPresenter from "./AppPresenter";

const AppContainer = (props: any) => {
  return <AppPresenter isLoggedIn={props.isLoggedIn as boolean} />;
};

export default graphql(IS_LOGGED_IN)(AppContainer);
