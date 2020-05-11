import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
// import { toast } from "react-toastify";
import { LOG_USER_IN } from "src/sharedQueries.local";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { VERIFY_PHONE } from "./VerifyPhoneQueries";
import useInput from "src/Hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";

const VerifyPhoneContainer: React.FC<RouteComponentProps> = ({ history, location }) => {
  const phoneNumber = location.state;
  const [loading, setLoading] = useState(false);
  const verificationKey = useInput("");
  const [completePhoneVerificationMutation] = useMutation(VERIFY_PHONE);
  const [logUserInMutation] = useMutation(LOG_USER_IN);

  // useEffect(() => {
    if (!phoneNumber) {
      history.replace("/");
    }
  // }, []);

  const onSubmit = async () => {
    setLoading(true);
    const key = verificationKey.value;
    const { data } = await completePhoneVerificationMutation({
      variables: {
        key,
        phoneNumber,
      },
    });
    if (
      data &&
      data.CompletePhoneVerification &&
      data.CompletePhoneVerification.ok
    ) {
      toast.success(`hello ${phoneNumber}`);
      const token = data.CompletePhoneVerification.token;
      if (token) {
        logUserInMutation({
          variables: {
            token,
          },
        });
      }
    } else {
      toast.error("please check your verification code");
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
