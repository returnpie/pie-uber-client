import React from "react";
import { graphql } from "@apollo/react-hoc";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { IS_LOGGED_IN } from "./AppQueries";
import AppPresenter from "./AppPresenter";

const AppContainer: React.SFC = (props: any) => {
  return (
    <>
      <AppPresenter isLoggedIn={props.data.auth.isLoggedIn as boolean} />
      <ToastContainer draggable={true} position={"bottom-center"} />
    </>
  );
};

export default graphql(IS_LOGGED_IN)(AppContainer);
