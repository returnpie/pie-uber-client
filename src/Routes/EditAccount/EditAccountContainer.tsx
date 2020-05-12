import axios from "axios";
import React, { useContext, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import EditAccountPresenter from "./EditAccountPresenter";
import { UPDATE_PROFILE } from "./EditAccountQueries";
import { UserContext } from "src/Components/Context/UserContext";
import { useMutation } from "@apollo/react-hooks";
import useInput from "src/Hooks/useInput";
import { USER_PROFILE } from "src/sharedQueries";

interface IProps extends RouteComponentProps<any> {}

const EditAccountContainer: React.FC<IProps> = () => {
  const context = useContext(UserContext);
  const { email, firstName, lastName, profilePhoto } = context.user;
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const newEmail = useInput(email);
  const newFirstName = useInput(firstName);
  const newLastName = useInput(lastName);
  const [newProfilePhoto, setNewProfilePhoto] = useState(profilePhoto);

  const [updateProfileMutation] = useMutation(UPDATE_PROFILE);

  const onChangeInput = {
    email: newEmail.onChange,
    firstName: newFirstName.onChange,
    lastName: newLastName.onChange,
    // profilePhoto: newProfilePhoto.onChange,
  };

  const onSubmitUpdateProfile = async () => {
    setLoading(true);
    const { data } = await updateProfileMutation({
      variables: {
        email: newEmail.value,
        firstName: newFirstName.value,
        lastName: newLastName.value,
        profilePhoto: newProfilePhoto,
      },
      refetchQueries: [{ query: USER_PROFILE }],
    });
    if (data && data.UpdateMyProfile) {
      const { UpdateMyProfile } = data;
      if (UpdateMyProfile.ok) {
        toast.success("Profile updated!");
      } else if (UpdateMyProfile.error) {
        toast.error(UpdateMyProfile.error);
      }
    } else {
      toast.error("fail.. please try again later..");
    }
    setLoading(false);
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (files) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("api_key", "391984853138821");
      formData.append("upload_preset", "pie-uber");
      formData.append("timestamp", String(Date.now() / 1000));
      const {
        data: { secure_url },
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/returnpie/image/upload",
        formData
      );
      if (secure_url) {
        setNewProfilePhoto(secure_url);
      } else {
        toast.error("Can't upload photo.. please try again later..")
      }
      setUploading(false);
    }
  };

  return (
    <EditAccountPresenter
      email={newEmail.value}
      firstName={newFirstName.value}
      lastName={newLastName.value}
      profilePhoto={newProfilePhoto}
      loading={loading}
      uploading={uploading}
      onChangeInput={onChangeInput}
      onSubmitUpdateProfile={onSubmitUpdateProfile}
      onFileChange={onFileChange}
    />
  );
};

export default EditAccountContainer;
