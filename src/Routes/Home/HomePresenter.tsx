import React, { useEffect } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Sidebar from "react-sidebar";
import Menu from "src/Components/Menu";
import AddressBar from "src/Components/AddressBar";
import Button from "src/Components/Button";
import { User } from "src/types";
import RidePopUp from "src/Components/RidePopUp";

const Container = styled.div``;

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
`;

const RequestButton = styled(ExtendedButton)`
  bottom: 150px;
`;

interface IProps {
  isMapNodeLoaded: () => void;
  user: User;
  isMenuOpen: boolean;
  onSetOpen: () => void;
  address: string;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onClickButton: () => void;
  price: string;
  onClickRequestButton: () => void;
  rideData: any;
  mapRef: any;
  setRideRouterPath: (rideId: number) => void;
}

const HomePresenter: React.SFC<IProps> = ({
  isMapNodeLoaded,
  user,
  isMenuOpen,
  onSetOpen,
  address,
  onChangeInput,
  onKeyDown,
  onBlur,
  onClickButton,
  price,
  onClickRequestButton,
  rideData,
  mapRef,
  setRideRouterPath
}) => {
  console.log(address, Boolean(address));
  useEffect(() => {
    isMapNodeLoaded();
  }, []);
  return (
    <Container>
      <Helmet>
        <title>Home | uber</title>
      </Helmet>
      <Sidebar
        sidebar={<Menu />}
        open={isMenuOpen}
        onSetOpen={onSetOpen}
        styles={{
          sidebar: { width: "80%", backgroundColor: "white", zIndex: "10" },
        }}
      >
        <MenuButton onClick={onSetOpen}>|||</MenuButton>
      </Sidebar>
      {!user.isDriving && (
        <>
          <AddressBar
            value={address}
            onChange={onChangeInput}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
          />
          <ExtendedButton
            disabled={!address}
            value={
              address
                ? price
                  ? "Change address"
                  : "Pick this place"
                : "Tell me your destination"
            }
            onClick={onClickButton}
          />
        </>
      )}
      {price && (
        <RequestButton
          value={`Request Ride (￦ ${price})`}
          onClick={onClickRequestButton}
        />
      )}
      {rideData && rideData.GetNearbyRide && rideData.GetNearbyRide.ok && (
        <RidePopUp rideData={rideData.GetNearbyRide.ride} setRideRouterPath={setRideRouterPath} />
      )}

      <Map ref={mapRef} />
    </Container>
  );
};

export default HomePresenter;
