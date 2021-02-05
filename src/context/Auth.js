import React, { useState, createContext } from "react";
import { requestLogin, requestSignup, requestUser } from "../Api/api";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({});

  const login = async (username, password) => {
    requestLogin(username, password).then((data) => {
      if (data.user) {
        setUser(data.user);
        localStorage.setItem("u_token", data.user.token);
        return 1;
      } else {
        return data.error;
      }
    });
  };

  const signup = async (username, password) => {
    requestSignup(username, password).then((data) => {
      if (data.user) {
        localStorage.setItem("u_token", data.user.token);
        setUser(data.user);
        return 1;
      } else {
        return data.error;
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("u_token");
    setUser({});
  };

  const getUser = (u_token) => {
    requestUser(u_token).then((data) => {
      if (data.user) {
        setUser(data.user);
      }
    });
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, login, signup, logout, getUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
