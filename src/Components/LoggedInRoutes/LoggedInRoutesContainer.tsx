import React, { useContext, useEffect } from "react";
import LoggedInRoutesPresenter from "./LoggedInRoutesPresenter";
import { Context } from "../Context/UserContext";
import { useQuery } from "@apollo/react-hooks";
import { USER_PROFILE } from "src/sharedQueries";
import { User } from "src/types";

const LoggedInRoutesContainer: React.SFC = () => {
  const context = useContext(Context);
  const { data } = useQuery(USER_PROFILE);

  useEffect(() => {
    if (data && data.GetMyProfile && data.GetMyProfile.ok) {
      const user = data.GetMyProfile.user as User;
      const newUser = {
        id: user.id,
        profilePhoto: user.profilePhoto,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isDriving: user.isDriving,
      };
      context.setUser(newUser);
    }
  }, [data]);

  return <LoggedInRoutesPresenter isLoading={data} />;
};

export default LoggedInRoutesContainer;
