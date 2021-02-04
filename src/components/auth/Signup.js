import React, { useContext } from "react";
import { UserContext } from "../../context/Auth";

export default function Signup() {
  const { user, signup } = useContext(UserContext);
  return (
    <div>
      <div className="user">{user?.name}</div>
      <div className="user">{user?.password}</div>
      <button onClick={() => signup("testing", new Date().toString())}>
        Set date user
      </button>
    </div>
  );
}
