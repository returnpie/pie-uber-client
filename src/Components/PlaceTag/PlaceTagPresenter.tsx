import React from "react";
import styled from "styled-components";

const Place = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  & i {
    font-size: 12px;
  }
`;

const Container = styled.div`
  margin-left: 10px;
`;

const Name = styled.span`
  display: block;
`;

const Icon = styled.span`
  cursor: pointer;
`;

const Address = styled.span`
  color: ${props => props.theme.greyColor};
  font-size: 14px;
`;

interface IProps {
  name: string;
  address: string;
  isFav: boolean;
  onClickEditPlace: () => void;
}

const PlaceTagPresenter: React.SFC<IProps> = ({
  name,
  address,
  isFav,
  onClickEditPlace
}) => (
  <Place>
    <Icon onClick={onClickEditPlace}>{isFav ? "★" : "✩"}</Icon>
    <Container>
      <Name>{name}</Name>
      <Address>{address}</Address>
    </Container>
  </Place>
);

export default PlaceTagPresenter;
