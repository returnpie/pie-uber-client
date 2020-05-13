import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_PLACES } from "src/sharedQueries";
import AddPlacePresenter from "./AddPlacePresenter";
import { ADD_PLACE } from "./AddPlaceQuery";
import useInput from "src/Hooks/useInput";
import { useMutation } from "@apollo/react-hooks";

const AddPlaceContainer: React.FC<RouteComponentProps> = ({ history }) => {
  const name = useInput();
  const address = useInput();
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  const [addPlaceMutation] = useMutation(ADD_PLACE);

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
        lat: 1.34,
        lng: 1.34,
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
      // pickedAddress={lat !== 0 && lng !== 0}
    />
  );
};

export default AddPlaceContainer;
