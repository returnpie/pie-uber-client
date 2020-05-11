import React from "react";
import { RouteComponentProps } from "react-router-dom";
// import { toast } from "react-toastify";
// import { LOG_USER_IN } from "src/sharedQueries.local";
import SocialLoginPresenter from "./SocialLoginPresenter";
// import { FACEBOOK_CONNECT } from "./SocialLoginQueries";

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
}

interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    fbId: "",
    firstName: "",
    lastName: "",
  };
  public render() {
    return <SocialLoginPresenter />;
  }

  // public loginCallback = (response) => {
  //   const { name, first_name, last_name, email, id, accessToken } = response;
  //   if (accessToken) {
  //     toast.success(`Welcome ${name}!`);
  //     this.facebookMutation({
  //       variables: {
  //         email,
  //         fbId: id,
  //         firstName: first_name,
  //         lastName: last_name,
  //       },
  //     });
  //   } else {
  //     toast.error("Could not log you in 😔");
  //   }
  // };
}

export default SocialLoginContainer;
