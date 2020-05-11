import React from "react";
import Helmet from "react-helmet";
import Button from "src/Components/Button";
import Form from "src/Components/Form";
import Header from "src/Components/Header";
import Input from "src/Components/Input";
import styled from "styled-components";
import PhotoInput from "src/Components/PhotoInput";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  loading: boolean;
  uploading: boolean;
  onChangeInput: {
    email: (event: React.ChangeEvent<HTMLInputElement>) => void;
    firstName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    lastName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  onSubmitUpdateProfile: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditAccountPresenter: React.SFC<IProps> = ({
  firstName,
  lastName,
  email,
  profilePhoto,
  loading,
  uploading,
  onChangeInput,
  onSubmitUpdateProfile,
  onFileChange
}) => (
  <Container>
    <Helmet>
      <title>Edit Account | uber</title>
    </Helmet>
    <Header title={"Edit Account"} backTo={"/"} />
    <ExtendedForm submitFn={onSubmitUpdateProfile}>
      <PhotoInput
        uploading={uploading}
        fileUrl={profilePhoto}
        onChange={onFileChange}
      />
      <ExtendedInput
        onChange={onChangeInput.firstName}
        type={"text"}
        value={firstName}
        placeholder={"First name"}
        name={"firstName"}
      />
      <ExtendedInput
        onChange={onChangeInput.lastName}
        type={"text"}
        value={lastName}
        placeholder={"Last name"}
        name={"lastName"}
      />
      <ExtendedInput
        onChange={onChangeInput.email}
        type={"email"}
        value={email}
        placeholder={"Email"}
        name={"email"}
      />
      <Button onClick={null} value={loading ? "Loading" : "Update"} />
    </ExtendedForm>
  </Container>
);

export default EditAccountPresenter;
