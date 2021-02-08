import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/Auth";
import { ServerContext } from "../../context/Server";
import "../css/Helper/CreateServer.css";

function CreateServer() {
  const { user } = useContext(UserContext);
  const { createServer } = useContext(ServerContext);

  const history = useHistory();

  const [newServer, setNewServer] = useState({
    server_name: "",
    server_icon: "",
    server_poster: "",
    user_id: user?.token,
  });

  const formSubmit = (e) => {
    e.preventDefault();
    createServer(newServer).then((data) => {
      console.log(data);
      history.push("/");
    });

    console.log("create server", newServer);
  };

  return (
    <div className="create__server">
      <div className="cs__form__cont">
        <form onSubmit={formSubmit} className="cs__form">
          <input
            type="text"
            name="server_name"
            value={newServer.server_name}
            onChange={(e) =>
              setNewServer({ ...newServer, server_name: e.target.value })
            }
            placeholder="Name of your server"
          />
          <input
            type="text"
            name="server_icon"
            value={newServer.server_icon}
            onChange={(e) =>
              setNewServer({ ...newServer, server_icon: e.target.value })
            }
            placeholder="Icon link for your server"
          />
          <input
            type="text"
            name="server_poster"
            value={newServer.server_poster}
            onChange={(e) =>
              setNewServer({ ...newServer, server_poster: e.target.value })
            }
            placeholder="Poster link for your server"
          />
          <button type="submit">Create server</button>
        </form>
      </div>
    </div>
  );
}

export default CreateServer;
