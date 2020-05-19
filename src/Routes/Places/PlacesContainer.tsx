import React, { useContext } from "react";
import PlacesPresenter from "./PlacesPresenter";
import { PlaceContext } from "src/Context/PlaceContext";

const PlacesContainer: React.FC = () => {
  const { places } = useContext(PlaceContext);
  return <PlacesPresenter places={places} />;
};

export default PlacesContainer;
