import React, { useEffect, useState } from "react";
// import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
// import { toast } from "react-toastify";
// import { LOG_USER_IN } from "../../sharedQueries";
// import { verifyPhone, verifyPhoneVariables } from "../../types/api";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { VERIFY_PHONE } from "./VerifyPhoneQueries";
import useInput from "../../Hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";

interface IProps extends RouteComponentProps {
  data: any;
}

const VerifyPhoneContainer: React.FunctionComponent<IProps> = (props) => {
  const phoneNumber = props.location.state;
  const [loading, setLoading] = useState(false);
  const verificationKey = useInput("");
  const [completePhoneVerificationMutation] = useMutation(VERIFY_PHONE);

  useEffect(() => {
    if (!phoneNumber) {
      props.history.replace("/");
    }
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    const key = verificationKey.value;
    const { data } = await completePhoneVerificationMutation({
      variables: {
        key,
        phoneNumber,
      },
    });
    if (data && data.CompletePhoneVerification && data.CompletePhoneVerification.ok) {
      toast.success(`hello ${phoneNumber}`);
      console.log(data);
    } else {
      toast.error('please check your verification code');
      setLoading(false);
    }
  };

  return (
    <VerifyPhonePresenter
      verificationKey={verificationKey.value}
      loading={loading}
      onChange={verificationKey.onChange}
      onSubmit={onSubmit}
    />
  );
};

export default VerifyPhoneContainer;
