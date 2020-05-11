import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import HomePresenter from "./HomePresenter";

interface IProps extends RouteComponentProps<any> {}

const HomeContainer: React.FC<IProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onSetOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <HomePresenter isMenuOpen={isMenuOpen} onSetOpen={onSetOpen} />;
};
export default HomeContainer;
