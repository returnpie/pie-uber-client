import React from "react";
import PlaceTagPresenter from "./PlaceTagPresenter";
import { GET_PLACES } from "../../sharedQueries";
import { EDIT_PLACE } from "./PlaceTagQueries";

interface IProps {
  id: number;
  name: string;
  address: string;
  isFav: boolean;
}

const PlaceTagContainer: React.FC<IProps> = ({ id, name, address, isFav }) => {
    return (
          <PlaceTagPresenter
            // onStarPress={editPlaceFn}
            name={name}
            address={address}
            isFav={isFav}
          />
    );
  }

export default PlaceTagContainer;
