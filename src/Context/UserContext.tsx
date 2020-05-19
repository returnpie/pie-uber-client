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

const context: UserContext = {
  user: initUser,
  setUser: (newUser: User) => {},
};

export const UserContext = createContext<UserContext>(context);

export const UserContextProvider: React.FC<IProps> = ({ children }) => {

  const [user, setUser] = useState<User>(initUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
