import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/Auth";
import "./css/Home.css";

export default function Home() {
  const history = useHistory();
  const { user, logout } = useContext(UserContext);

  const goto = (path) => {
    history.push(`${path}`);
  };
  return (
    <div className="home">
      <h1 className="home__header">Pinger. . . .</h1>
      <div className="home__greet">{user?.name}</div>
      {user?.name ? (
        <button className="home__auth__loginBtn" onClick={() => logout()}>
          LogOut
        </button>
      ) : (
        <div className="home__auth">
          <div className="home__auth__login">
            <button
              className="home__auth__loginBtn"
              onClick={() => goto("/login")}
            >
              Login
            </button>
          </div>
          <div className="home__auth__signup">
            <button
              className="home__auth__signupBtn"
              onClick={() => goto("/signup")}
            >
              Signup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
