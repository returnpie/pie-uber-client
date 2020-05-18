import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_PLACES } from "src/sharedQueries";
import AddPlacePresenter from "./AddPlacePresenter";
import { ADD_PLACE } from "./AddPlaceQuery";
import useInput from "src/Hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { AddPlaceState } from "src/types";

const AddPlaceContainer: React.FC<RouteComponentProps> = ({ history, location }) => {
  const name = useInput();
  const address = useInput();
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [pickedAddress, setPickedAddress] = useState(false);
  const [addPlaceMutation] = useMutation(ADD_PLACE);

  useEffect(() => {
    if (location.state) {
      const state = location.state as AddPlaceState;
      setLat(state.latLng.lat);
      setLng(state.latLng.lng);
      address.setValue(state.address);
      setPickedAddress(true);
    }
  }, [location]);

  const onChangeInput = {
    name: name.onChange,
    address: address.onChange,
  };

  const onSubmitAddPlace = async () => {
    setLoading(true);
    const { data } = await addPlaceMutation({
      variables: {
        name: name.value,
        address: address.value,
        lat: 0,
        lng: 0,
        isFav: false,
      },
      refetchQueries: [{ query: GET_PLACES }],
    });
    if (data && data.AddPlace && data.AddPlace.ok) {
      toast.success("Place added!");
      history.push("/places");
    } else {
      toast.error("Please try again later..");
    }
    setLoading(false);
  };

  return (
    <AddPlacePresenter
      // onInputChange={this.onInputChange}
      name={name.value}
      address={address.value}
      onChangeInput={onChangeInput}
      loading={loading}
      onSubmitAddPlace={onSubmitAddPlace}
      // onSubmit={addPlaceFn}
      pickedAddress={pickedAddress}
    />
  );
};

export default AddPlaceContainer;
