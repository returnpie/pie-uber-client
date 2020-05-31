import React from "react";
import RidePopUpPresenter from "./RidePopUpPresenter";
import { RideData } from "src/types";
import { useMutation } from "@apollo/react-hooks";
import { ACCEPT_RIDE } from "src/Routes/Home/HomeQueries";
import { toast } from "react-toastify";

interface IProps {
  rideData: RideData;
  setRideRouterPath: (rideId: number) => void;
}

const RidePopUpContainer: React.SFC<IProps> = ({ rideData, setRideRouterPath }) => {
  const [acceptRideMutation] = useMutation(ACCEPT_RIDE);

  const onClickAcceptButton = async () => {
    const { data } = await acceptRideMutation({
      variables: {
        rideId: rideData.id,
      },
    });
    if (data && data.UpdateRideStatus) {
      if (data.UpdateRideStatus.ok) {
        toast.success("Drive safely");
        setRideRouterPath(rideData.id);
      } else {
        toast(data.UpdateRideStatus.error);
      }
    }
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
