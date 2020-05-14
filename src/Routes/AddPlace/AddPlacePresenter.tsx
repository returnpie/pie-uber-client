import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Button from "src/Components/Button";
import Form from "src/Components/Form";
import Header from "src/Components/Header";
import Input from "src/Components/Input";
import styled from "styled-components";

const Container = styled.div`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;

const ExtendedLink = styled(Link)`
  text-decoration: underline;
  margin-bottom: 20px;
  display: block;
`;

interface IProps {
  name: string;
  address: string;
  onChangeInput: {
    name: (event: React.ChangeEvent<HTMLInputElement>) => void;
    address: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  // onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  onSubmitAddPlace: () => void;
  // onSubmit: MutationFn;
  pickedAddress: boolean;
}

const AddPlacePresenter: React.SFC<IProps> = ({
  // onInputChange,
  name,
  address,
  onChangeInput,
  loading,
  onSubmitAddPlace,
  pickedAddress
}) => (
  <React.Fragment>
    <Helmet>
      <title>Add Place | Nuber</title>
    </Helmet>
    <Header title={"Add Place"} backTo={"/"} />
    <Container>
      <Form submitFn={onSubmitAddPlace}>
        <ExtendedInput
          placeholder={"Name"}
          type={"text"}
          onChange={onChangeInput.name}
          value={name}
        />
        <ExtendedInput
          placeholder={"Address"}
          type={"text"}
          onChange={onChangeInput.address}
          value={address}
        />
        <ExtendedLink to={"/find-address"}>Pick place from map</ExtendedLink>
        {pickedAddress && (
          <Button
            onClick={null}
            disabled={loading}
            value={loading ? "Adding place" : "Add Place"}
          />
        )}
      </Form>
    </Container>
  </React.Fragment>
);

export default AddPlacePresenter;
