import React, { useState, createContext } from "react";
import { requestSignup } from "../Api/api";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({});

  const login = (username, password) => {
    if (username === "test") {
      setUser({ name: username, password });
    } else {
      setUser({});
    }
  };

  const signup = async (username, password) => {
    if (
      username !== "" ||
      username !== null ||
      password !== "" ||
      password !== null
    ) {
      requestSignup(username, password).then((data) => {
        if (data.user) {
          setUser(data.user);
          console.log("returning real user");
          return 1;
        } else {
          console.log("returning error");
          return data.error;
        }
      });
    } else {
      setUser({});
      console.log("something went wrong");
      return "Somthing went wrong";
    }
  };

  const logout = () => {
    setUser({});
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, signup, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};
