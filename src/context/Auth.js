import React, { useState, createContext } from "react";

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

  const signup = (username, password) => {
    if (
      username !== "" ||
      username !== null ||
      password !== "" ||
      password !== null
    ) {
      setUser({ name: username, password });
    } else {
      setUser({});
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
