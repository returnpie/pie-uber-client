import React from "react";
import LoggedInRoutes from "../LoggedInRoutes";
import LoggedOutRoutes from "../LoggedOutRoutes";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "../Context/UserContext";
import { PlaceContextProvider } from "../Context/PlaceContext";

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <UserContextProvider>
          <PlaceContextProvider>
            <LoggedInRoutes />
          </PlaceContextProvider>
        </UserContextProvider>
      ) : (
        <LoggedOutRoutes />
      )}
    </BrowserRouter>
  );
};

export default AppPresenter;
