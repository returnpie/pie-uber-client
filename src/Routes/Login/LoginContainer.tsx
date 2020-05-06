import React from "react";
import LoginPresenter from ".";
import { RouteComponentProps } from "react-router-dom";

const LoginContainer = (props: RouteComponentProps) => {
  const onClickPhoneLogin = () => {
    const { history } = props;
    return history.push("/phone-login");
  };
  const onClickSocialLogin = () => {
      console.log('??');
    const { history } = props;
    return history.push("/social-login");
  };

  return (
    <LoginPresenter
      onClickPhoneLogin={onClickPhoneLogin}
      onClickSocialLogin={onClickSocialLogin}
    />
  );
};

export default LoginContainer;
