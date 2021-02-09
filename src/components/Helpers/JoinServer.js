import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/Auth";
import { ServerContext } from "../../context/Server";
import axios from "axios";
import { URL } from "../../Api/api";
import ServerLoading from "./ServerLoading";

const JoinServer = () => {
  const { user, authLoading } = useContext(UserContext);
  const { addUserToServer } = useContext(ServerContext);
  const { server_id } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.username) {
    }
  }, [user]);

  if (authLoading) {
    return <ServerLoading />;
  }

  return <div>{URL + server_id}</div>;
};

export default JoinServer;
