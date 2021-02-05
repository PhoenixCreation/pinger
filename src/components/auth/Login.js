import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/Auth";
import "../css/auth/Login.css";

export default function Login() {
  const { user, login } = useContext(UserContext);
  const history = useHistory();

  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [usernameWarning, setUsernameWarning] = useState("");

  useEffect(() => {
    if (localStorage.getItem("u_token")) {
      history.push("/");
    }
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();
    await login(newUser.username, newUser.password).then((check) => {
      history.push("/");
    });
  };

  const handleUsername = (e) => {
    setNewUser({ ...newUser, username: e.target.value });
    if (usernameWarning !== "") {
      setUsernameWarning("");
    }
  };

  const handlePassword = (e) => {
    setNewUser({ ...newUser, password: e.target.value });
  };

  return (
    <div className="login">
      <div className="login__form__cont">
        <div className="login__form__header">Login</div>
        <form onSubmit={formSubmit} className="login__form">
          <div className="login__username__cont">
            <input
              type="username"
              name="username"
              value={newUser.username}
              onChange={handleUsername}
              placeholder="Username"
              className="login__username__field"
              required
            />
            <div className="login__username__warning">{usernameWarning}</div>
          </div>
          <div className="login__password__cont">
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handlePassword}
              placeholder="Password"
              className="login__password__field"
              required
            />
          </div>
          <button type="submit" className="login__submit_btn">
            login
          </button>
        </form>
        <div className="login__signup__redirection">
          <Link to="/signup" className="login__signup__text">
            Don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
