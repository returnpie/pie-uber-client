import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import AddressBar from "src/Components/AddressBar";

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
  mapRef: any;
}

const FindAddressPresenter: React.SFC<IProps> = ({
  address,
  onChangeInput,
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
        onBlur={undefined}
      />
      <Map ref={mapRef} />
    </div>
  );
};

export default FindAddressPresenter;
