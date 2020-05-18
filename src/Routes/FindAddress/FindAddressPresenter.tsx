import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import AddressBar from "src/Components/AddressBar";
import Button from "src/Components/Button";

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

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

interface IProps {
  address: string;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onClickButton: () => void;
  mapRef: any;
}

const FindAddressPresenter: React.SFC<IProps> = ({
  address,
  onChangeInput,
  onKeyDown,
  onBlur,
  onClickButton,
  mapRef,
}) => {
  return (
    <div>
      <Helmet>
        <title>Find Address | uber</title>
      </Helmet>
      <AddressBar
        value={address}
        onChange={onChangeInput}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
      <ExtendedButton value={"Pick this place"} onClick={onClickButton} />
      <Map ref={mapRef} />
    </div>
  );
};

export default FindAddressPresenter;
