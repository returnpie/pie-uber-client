import React, { useState, createContext } from "react";
import { User } from "src/types";

interface UserContext {
  user: User;
  setUser: (newUser: User) => void;
}

interface IProps {
  children: JSX.Element;
}

const initUser: User = {
  id: 0,
  profilePhoto: "",
  firstName: "",
  lastName: "",
  email: "",
  isDriving: false,
};

const UserContext: UserContext = {
  user: initUser,
  setUser: (newUser: User) => {},
};

export const Context = createContext<UserContext>(UserContext);

export const UserContextProvider: React.FC<IProps> = ({ children }) => {

  const [user, setUser] = useState<User>(initUser);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    </Context.Provider>
  );
};
