import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Header from "src/Components/Header";
import PlaceTag from "src/Components/PlaceTag";
import styled from "styled-components";
import { User, Place } from "src/types";

const Container = styled.div`
  padding: 0px 40px;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
`;

const Keys = styled.div``;

const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0px;
`;

interface IProps {
  user: User;
  places: Place[];
  onClickLogUserOut: () => void;
}

const SettingsPresenter: React.SFC<IProps> = ({
  user,
  places,
  onClickLogUserOut,
}) => (
  <React.Fragment>
    <Helmet>
      <title>Settings | uber</title>
    </Helmet>
    <Header title={"Account Settings"} backTo={"/"} />
    <Container>
      <GridLink to={"/edit-account"}>
        <React.Fragment>
          <Image src={user.profilePhoto} />
          <Keys>
            <Key>{user.lastName + " " + user.firstName}</Key>
            <Key>{user.email}</Key>
          </Keys>
        </React.Fragment>
      </GridLink>
      {places.map((place: Place) => (
        <PlaceTag
          key={place.id}
          id={place.id}
          name={place.name}
          address={place.address}
          isFav={place.isFav}
        />
      ))}
      <SLink to={"/places"}>Go to Places</SLink>
      <FakeLink onClick={onClickLogUserOut}>Log Out</FakeLink>
    </Container>
  </React.Fragment>
);

export default SettingsPresenter;
