import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../../context/Auth";
import { ServerContext } from "../../context/Server";
import axios from "axios";
import { URL } from "../../Api/api";
import ServerLoading from "./ServerLoading";
import "../css/Helper/JoinServer.css";

const JoinServer = () => {
  const { user, authLoading, getUser } = useContext(UserContext);
  const { addUserToServer } = useContext(ServerContext);
  const { server_id } = useParams();

  const history = useHistory();

  const [serverInfo, setServerInfo] = useState(null);
  const [error, setError] = useState("");
  const [alreadyInServer, setAlreadyInServer] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let u_token = localStorage.getItem("u_token");
    if (u_token) {
      getUser(u_token);
    }
  }, []);

  useEffect(() => {
    if (user.username) {
      getServerInfo();
    }
  }, [user]);

  const getServerInfo = async () => {
    try {
      const response = await axios.post(`${URL}/server/getsingle`, {
        server_id,
      });
      if (response.status === 202) {
        setServerInfo(response.data.server);
        setError("");
      } else {
        setError(`error from server => ${response.status}`);
      }
    } catch (error) {
      console.log(error);
      setError(`error from server => ${error.toString}`);
    }
  };

  const JoinTheServer = async () => {
    try {
      setLoading(true);
      addUserToServer(serverInfo.id, user.token).then((value) => {
        if (value === -1) {
          setError("you messed up");
        }
        history.push("/");
        setLoading(false);
      });
    } catch (error) {
      setError(error.toString);
    }
  };

  useEffect(() => {
    if (serverInfo) {
      console.log("checkin if user is already in server...", serverInfo.users);
      for (let i = 0; i < serverInfo.users.length; i++) {
        if (serverInfo.users[i].token === user.token) {
          setAlreadyInServer(true);
          console.log("here you go buddy,,, you are already in server");
        }
      }
    }
  }, [serverInfo]);

  if (authLoading) {
    return <ServerLoading />;
  }

  if (alreadyInServer) {
    return (
      <div className="alreadyInServer">
        You are already in this server. Go back and enjoy
      </div>
    );
  }

  return (
    <div className="JoinServer">
      {serverInfo && (
        <div className="serverInfo">
          <div className="server__header">
            <div className="server__icon__js">
              <img src={serverInfo.server_icon} alt="Nothing" />
            </div>
            <div className="server__name">{serverInfo.server_name}</div>
          </div>
          <div className="server__channels">
            {"server has total " +
              serverInfo.channels.text.length +
              " text channels and " +
              serverInfo.channels.voice.length +
              " voice channels"}
          </div>
          <div className="server__users">
            {"Total members: " + serverInfo.users.length}
          </div>
          <button
            className="join__server"
            disabled={loading}
            onClick={JoinTheServer}
          >
            Join this server
          </button>
        </div>
      )}
      {error && <div>Something went wrong</div>}
    </div>
  );
};

export default JoinServer;
