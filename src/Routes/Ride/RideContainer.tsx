import { SubscribeToMoreOptions } from "apollo-client";
import React, { useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import RidePresenter from "./RidePresenter";
import { UserContext } from "src/Context/UserContext";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_RIDE, RIDE_SUBSCRIPTION, UPDATE_RIDE_STATUS } from "./RideQueries";

interface IProps extends RouteComponentProps {}

const RideContainer: React.SFC<IProps> = ({ history, match }) => {
  const rideId = Number((match.params as any).rideId);
  if (!rideId) {
    history.replace("/");
  }
  const { subscribeToMore, data, loading } = useQuery(GET_RIDE, {
    variables: {
      rideId,
    },
  });
  const subscribeOptions: SubscribeToMoreOptions = {
    document: RIDE_SUBSCRIPTION,
    variables: {
      rideId,
    },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData) {
        return prev;
      } else {
        const {
          data: {
            RideStatusSubscription: { status },
          },
        } = subscriptionData;
        if (status === "FINISHED") {
          window.location.href = "/";
        }
      }
    },
  };
  subscribeToMore(subscribeOptions);

  const [updateRideMutation] = useMutation(UPDATE_RIDE_STATUS);

  const onClickUpdateRideStatus = async (status: string) => {
    await updateRideMutation({
      variables: {
        rideId,
        status,
      },
    });
  };

  const { user } = useContext(UserContext);
  return (
    <RidePresenter
      user={user}
      loading={loading}
      data={data}
      onClickUpdateRideStatus={onClickUpdateRideStatus}
    />
  );
};
export default RideContainer;
