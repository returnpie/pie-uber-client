import React, { useContext } from "react";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import SettingsPresenter from "./SettingsPresenter";
import { UserContext } from "src/Components/Context/UserContext";
import { useMutation } from "@apollo/react-hooks";
import { RouteComponentProps } from "react-router-dom";
import { PlaceContext } from "src/Components/Context/PlaceContext";

const SettingsContainer: React.FC<RouteComponentProps> = ({ history }) => {
  const { user } = useContext(UserContext);
  const { places } = useContext(PlaceContext);
  const [logUserOutMutation] = useMutation(LOG_USER_OUT);

  const onClickLogUserOut = async () => {
    await logUserOutMutation();
    window.location.reload();
  };

  return (
    <SettingsPresenter
      user={user}
      places={places}
      onClickLogUserOut={onClickLogUserOut}
    />
  );
};

export default SettingsContainer;
