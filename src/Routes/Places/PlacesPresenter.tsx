import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Header from "src/Components/Header";
import PlaceTag from "src/Components/PlaceTag";
import styled from "styled-components";
import { Place } from "src/types";

const Container = styled.div`
  padding: 0 40px;
  display: flex;
  flex-direction: column;

`;

const SLink = styled(Link)`
  margin: 40px 0;
  text-decoration: underline;
`;

interface IProps {
  places: Place[];
}

const PlacesPresenter: React.SFC<IProps> = ({ places }) => (
  <React.Fragment>
    <Helmet>
      <title>Places | uber</title>
    </Helmet>
    <Header title={"Places"} backTo={"/"} />
    <Container>
      {!places.length && "You have no places"}
      {places.map((place: Place) => (
        <PlaceTag
          key={place.id}
          id={place.id}
          isFav={place.isFav}
          name={place.name}
          address={place.address}
        />
      ))}
      <SLink to={"/add-place"}>Add some places!</SLink>
    </Container>
  </React.Fragment>
);

export default PlacesPresenter;
