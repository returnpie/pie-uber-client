import React, { useState } from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import useInput from "src/Hooks/useInput";
import { RouteComponentProps } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { PHONE_SIGN_IN } from "./PhoneQueries";
import { toast } from "react-toastify";

const PhoneLoginContainer: React.FC<RouteComponentProps> = ({ history }) => {
  const phoneNumber = useInput();
  const countryCode = useInput('+82');
  const [loading, setLoading] = useState<boolean>(false);

  const [phoneSigninMutation] = useMutation(PHONE_SIGN_IN);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const targetNumber = countryCode.value + phoneNumber.value;
    const { data } = await phoneSigninMutation({
      variables: {
        phoneNumber: targetNumber
      }});
      if (data && data.StartPhoneVerification && data.StartPhoneVerification.ok) {
        toast.success("Verify!");
        history.push('/verify-phone', targetNumber);
      } else {
        toast.error("Please check phone number");
      }
    setLoading(false);
  }


  return (
    <PhoneLoginPresenter
      phoneNumber={phoneNumber.value}
      phoneNumberOnChange={phoneNumber.onChange}
      countryCode={countryCode.value}
      countryCodeOnChange={countryCode.onChange}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default PhoneLoginContainer;
