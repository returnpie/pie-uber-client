import React, { useContext, useEffect } from "react";
import LoggedInRoutesPresenter from "./LoggedInRoutesPresenter";
import { UserContext } from "../Context/UserContext";
import { PlaceContext } from "../Context/PlaceContext";
import { useQuery } from "@apollo/react-hooks";
import { USER_PROFILE, GET_PLACES } from "src/sharedQueries";
import { User, Place } from "src/types";

const LoggedInRoutesContainer: React.SFC = () => {
  const userContext = useContext(UserContext);
  const placeContext = useContext(PlaceContext);
  const userData = useQuery(USER_PROFILE).data;
  const placeData = useQuery(GET_PLACES).data;

  useEffect(() => {
    if (userData && userData.GetMyProfile && userData.GetMyProfile.ok) {
      const user = userData.GetMyProfile.user as User;
      userContext.setUser(user);
    }
  }, [userData]);

  useEffect(() => {
    if (placeData && placeData.GetMyPlaces && placeData.GetMyPlaces.ok) {
      const places = placeData.GetMyPlaces.places as Place[];
      placeContext.setPlaces(places);
    }
  }, [placeData]);

  return <LoggedInRoutesPresenter isLoading={userData && placeData} />;
};

export default LoggedInRoutesContainer;
