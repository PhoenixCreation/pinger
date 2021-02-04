import React, { useContext } from "react";
import { UserContext } from "../../context/Auth";

export default function Login() {
  const { user, login } = useContext(UserContext);
  return (
    <div>
      <div className="user">{user?.name}</div>
      <div className="user">{user?.password}</div>
      <button
        className="now"
        onClick={() => login("test", `random ${Math.random()}`)}
      >
        Override
      </button>
    </div>
  );
}
