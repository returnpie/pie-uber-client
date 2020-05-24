import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "src/sharedQueries.local";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";
import { useMutation } from "@apollo/react-hooks";

// interface IProps extends RouteComponentProps<any> {}

const SocialLoginContainer: React.FC<RouteComponentProps> = () => {
  const [facebookLoginMutation] = useMutation(FACEBOOK_CONNECT);
  const [logUserInMutation] = useMutation(LOG_USER_IN);

  const loginCallback = async (response) => {
    const { first_name, last_name, email, id, accessToken } = response;
    if (accessToken) {
      const { data } = await facebookLoginMutation({
        variables: {
          email,
          fbId: id,
          firstName: first_name,
          lastName: last_name,
        },
      });
      if (data && data.FacebookConnect && data.FacebookConnect.ok) {
        const token = data.FacebookConnect.token;
        await logUserInMutation({
          variables: {
            token,
          },
        });
      }
    } else {
      toast.error("Could not log you in..");
    }
  };
  return <SocialLoginPresenter loginCallback={loginCallback} />;
};

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
// }

export default SocialLoginContainer;
