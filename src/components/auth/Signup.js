import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/Auth";
import "../css/auth/Signup.css";

export default function Signup() {
  const { user, signup } = useContext(UserContext);
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
    await signup(newUser.username, newUser.password).then((check) => {
      console.log(check);
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
    <div className="signup">
      <div className="signup__form__cont">
        <div className="signup__form__header">Sign Up</div>
        <form onSubmit={formSubmit} className="signup__form">
          <div className="signup__username__cont">
            <input
              type="username"
              name="username"
              value={newUser.username}
              onChange={handleUsername}
              placeholder="Username"
              className="signup__username__field"
              required
            />
            <div className="signup__username__warning">{usernameWarning}</div>
          </div>
          <div className="signup__password__cont">
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handlePassword}
              placeholder="Password"
              className="signup__password__field"
              required
            />
          </div>
          <button type="submit" className="signup__submit_btn">
            Signup
          </button>
        </form>
        <div className="sigup__login__redirection">
          <Link to="/login" className="signup__login__text">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
