import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_PLACES } from "../../sharedQueries";
import AddPlacePresenter from "./AddPlacePresenter";
import { ADD_PLACE } from "./AddPlaceQuery";

const AddPlaceContainer: React.FC<RouteComponentProps> = () => {
  const [address, setAddress] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  return (
    <AddPlacePresenter
      // onInputChange={this.onInputChange}
      address={address}
      name={name}
      // loading={loading}
      // onSubmit={addPlaceFn}
      // pickedAddress={lat !== 0 && lng !== 0}
    />
  );
};

export default AddPlaceContainer;
