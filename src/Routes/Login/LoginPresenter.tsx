import React from "react";
import bgImage from "src/Images/bg.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.header`
  height: 70%;
  background: linear-gradient(rgba(0, 153, 196, 0.5), rgba(0, 153, 196, 0.4)),
    url(${bgImage});
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  width: 110px;
  height: 110px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 -14px 28px rgba(0, 0, 0, 0.22);
  text-transform: uppercase;
  font-weight: 500;
  font-size: 25px;
`;

const Title = styled.h1``;

const Footer = styled.div``;

const Subtitle = styled.h2`
  font-size: 30px;
`;

const FakeInput = styled.div`
  margin: 50px 0px;
  font-size: 25px;
  font-weight: 300;
`;

const PhoneLogin = styled.div`
  padding: 20px;
`;

const Grey = styled.span`
  color: ${(props) => props.theme.greyColor};
  margin-left: 10px;
`;

const SocialLogin = styled.div`
  border-top: 1px solid ${(props) => props.theme.greyColor};
  padding: 30px 20px;
`;

const SocialLink = styled.span`
  color: ${(props) => props.theme.blueColor};
  font-size: 20px;
`;

const LoginPresenter: React.SFC = () => {
  return (
    <Container>
      <Helmet>
        <title>PIE-UBER | LOGIN</title>
      </Helmet>
      <Header>
        <Logo>
          <Title>PIE-UBER</Title>
        </Logo>
      </Header>
      <Footer>
        <Subtitle>Get moving with PIE-uber</Subtitle>
        {/* <Link to={"/phone-login"}>
          <PhoneLogin>
            <FakeInput>
              <span role="img" aria-label="">
                🇰🇷
              </span>{" "}
              +82 <Grey>Enter your mobile number</Grey>
            </FakeInput>
          </PhoneLogin>
        </Link> */}
        <Link to={"/social-login"}>
          <SocialLogin>
            <SocialLink>Connect with social</SocialLink>
          </SocialLogin>
        </Link>
      </Footer>
    </Container>
  );
};

export default LoginPresenter;
