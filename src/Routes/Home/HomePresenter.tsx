import React from "react";
import Helmet from "react-helmet";
// import Button from "src/Components/Button";
import styled from "styled-components";
import Sidebar from "react-sidebar";
import Menu from "src/Components/Menu";
import AddressBar from "src/Components/AddressBar";
import Button from "src/Components/Button";

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

// const RequestButton = styled(ExtendedButton)`
//   bottom: 250px;
// `;

interface IProps {
  isMenuOpen: boolean;
  onSetOpen: () => void;
  address: string;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onClickButton: () => void;
  mapRef: any;
}

const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  onSetOpen,
  address,
  onChangeInput,
  onKeyDown,
  onBlur,
  onClickButton,
  mapRef,
}) => (
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
    <AddressBar
      value={address}
      onChange={onChangeInput}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
    <ExtendedButton value={"Pick this place"} onClick={onClickButton} />
    <Map ref={mapRef} />
  </Container>
);

export default HomePresenter;
