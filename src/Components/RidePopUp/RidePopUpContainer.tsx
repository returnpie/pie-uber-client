import React from "react";
import RidePopUpPresenter from "./RidePopUpPresenter";
import { RideData } from "src/types";
import { useMutation } from "@apollo/react-hooks";
import { ACCEPT_RIDE } from "src/Routes/Home/HomeQueries";

interface IProps {
  rideData: RideData;
}

const RidePopUpContainer: React.SFC<IProps> = ({ rideData }) => {
  const [acceptRideMutation] = useMutation(ACCEPT_RIDE);

  const onClickAcceptButton = async () => {
    const { data } = await acceptRideMutation({
      variables: {
        rideId: 3,
      },
    });
    console.log(data);
  };

  return (
    <>
      {rideData ? (
        <RidePopUpPresenter
          rideData={rideData}
          onClickButton={onClickAcceptButton}
        />
      ) : undefined}
    </>
  );
};

export default RidePopUpContainer;
