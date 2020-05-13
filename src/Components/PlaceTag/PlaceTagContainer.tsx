import React from "react";
import PlaceTagPresenter from "./PlaceTagPresenter";
import { useMutation } from "@apollo/react-hooks";
import { EDIT_PLACE } from "./PlaceTagQueries";
import { GET_PLACES } from "src/sharedQueries";
import { toast } from "react-toastify";

interface IProps {
  id: number;
  name: string;
  address: string;
  isFav: boolean;
}

const PlaceTagContainer: React.FC<IProps> = ({ id, name, address, isFav }) => {
  const [editPlaceMutation] = useMutation(EDIT_PLACE);

  const onClickEditPlace = async () => {
    const { data } = await editPlaceMutation({
      variables: {
        placeId: id,
        isFav: !isFav,
      },
      refetchQueries: [{ query: GET_PLACES }],
    });
    if (data && data.EditPlace && data.EditPlace.error) {
      toast.error(data.EditPlace.error);
    }
  };

  return (
    <PlaceTagPresenter
      name={name}
      address={address}
      isFav={isFav}
      onClickEditPlace={onClickEditPlace}
    />
  );
};

export default PlaceTagContainer;
