import React from "react";
import Helmet from "react-helmet";
// import Button from "src/Components/Button";
import styled from "styled-components";
import Sidebar from "react-sidebar";
import Menu from "src/Components/Menu";

const Container = styled.div``;

// const MenuButton = styled.button`
//   appearance: none;
//   padding: 10px;
//   position: absolute;
//   top: 10px;
//   left: 10px;
//   text-align: center;
//   font-weight: 800;
//   border: 0;
//   cursor: pointer;
//   font-size: 20px;
//   transform: rotate(90deg);
//   z-index: 2;
//   background-color: transparent;
// `;

// const Map = styled.div`
//   position: absolute;
//   height: 100%;
//   width: 100%;
// `;

// const ExtendedButton = styled(Button)`
//   position: absolute;
//   bottom: 50px;
//   left: 0;
//   right: 0;
//   margin: auto;
//   z-index: 10;
//   height: auto;
//   width: 80%;
// `;

// const RequestButton = styled(ExtendedButton)`
//   bottom: 250px;
// `;

interface IProps {
  isMenuOpen: boolean;
  onSetOpen: () => void;
}

const HomePresenter: React.SFC<IProps> = ({ isMenuOpen, onSetOpen }) => (
  <Container>
    <Helmet>
      <title>Home | uber</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu />}
      open={isMenuOpen}
      onSetOpen={onSetOpen}
      styles={{
        sidebar: { width: "80%", backgroundColor: "white", zIndex: "10" }
      }}
    >
      <button onClick={onSetOpen}>open sidebar</button>
    </Sidebar>
  </Container>
);

export default HomePresenter;
