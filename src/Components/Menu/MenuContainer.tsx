import React, { useContext } from "react";
import MenuPresenter from "./MenuPresenter";
import { UserContext } from "../Context/UserContext";
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_DRIVING } from "./MenuQueries";
import { User } from "src/types";
import { toast } from "react-toastify";

const MenuContainer: React.SFC = () => {
  const { user, setUser } = useContext(UserContext);
  const [toggleDrivingMutation] = useMutation(TOGGLE_DRIVING);

  const onClickToggleDriving = async () => {
    const { data } = await toggleDrivingMutation();
    if (data && data.ToggleDrivingMode && data.ToggleDrivingMode.ok) {
      const newUser: User = {
        ...user,
        isDriving: !user.isDriving,
      };
      setUser(newUser);
    } else {
      toast.error("fail.. please try again later..");
    }
  };

  return (
    <MenuPresenter user={user} onClickToggleDriving={onClickToggleDriving} />
  );
};

export default MenuContainer;
