import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { RideData } from "src/types";

interface IProps {
  rideData:RideData
  onClickButton: () => void;
}

const Container = styled.div`
  background-color: white;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 80%;
  height: 50%;
  z-index: 9;
  padding: 20px;
`;

const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

const Data = styled.span`
  color: ${(props) => props.theme.blueColor};
`;

const Img = styled.img`
  border-radius: 50%;
  margin-right: 20px;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const RidePopUp: React.SFC<IProps> = ({
  rideData,
  onClickButton,
}) => (
  <Container>
    <Title>Pick Up Address</Title>
    <Data>{rideData.pickUpAddress}</Data>
    <Title>Drop Off Address</Title>
    <Data>{rideData.dropOffAddress}</Data>
    <Title>Price</Title>
    <Data>{rideData.price}</Data>
    <Title>Distance</Title>
    <Data>{rideData.distance}</Data>
    <Title>Passenger:</Title>
    <Passenger>
      <Img src={rideData.passengerPhoto} />
      <Data>{rideData.passengerName}</Data>
    </Passenger>
    <Button
      onClick={onClickButton}
      value={"Accept Ride"}
    />
  </Container>
);

export default RidePopUp;
