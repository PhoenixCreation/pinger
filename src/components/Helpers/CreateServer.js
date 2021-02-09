import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/Auth";
import { ServerContext } from "../../context/Server";
import "../css/Helper/CreateServer.css";

function CreateServer() {
  const { user } = useContext(UserContext);
  const { createServer, addUserToServer } = useContext(ServerContext);

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

  // ***This is for adding user to server with serverId and userid.... can be used in other component
  //    as a invite of server component
  // ***
  // const [addServerId, setAddServerId] = useState("");
  // const [addUserId, setAddUserId] = useState("");

  // const AddUser = (e) => {
  //   e.preventDefault();
  //   addUserToServer(addServerId, addUserId);
  //   setAddServerId("");
  //   setAddUserId("");
  // };

  return (
    <div className="create__server">
      <div className="cs__form__cont">
        <div className="cs__form__heading">
          <div className="cs__form__headingText">Create an Amazing server</div>
          <div className="cs__form__goback" onClick={() => history.goBack()}>
            {"X"}
          </div>
        </div>
        <form onSubmit={formSubmit} className="cs__form">
          <input
            type="text"
            name="server_name"
            value={newServer.server_name}
            onChange={(e) =>
              setNewServer({ ...newServer, server_name: e.target.value })
            }
            placeholder="Name of your server"
            className="cs__form__field"
            required
          />
          <input
            type="text"
            name="server_icon"
            value={newServer.server_icon}
            onChange={(e) =>
              setNewServer({ ...newServer, server_icon: e.target.value })
            }
            placeholder="Icon link for your server"
            className="cs__form__field"
            required
          />
          <input
            type="text"
            name="server_poster"
            value={newServer.server_poster}
            onChange={(e) =>
              setNewServer({ ...newServer, server_poster: e.target.value })
            }
            placeholder="Poster link for your server"
            className="cs__form__field"
            required
          />
          <button type="submit" className="cs__form__submit">
            Create server
          </button>
        </form>
      </div>
      {/* <div className="adduser__from__cont">
        <form onSubmit={AddUser}>
          <input
            type="text"
            value={addServerId}
            onChange={(e) => setAddServerId(e.target.value)}
            placeholder="Server Id"
          />
          <input
            type="text"
            value={addUserId}
            onChange={(e) => setAddUserId(e.target.value)}
            placeholder="User Id"
          />
          <button type="submit">Add user</button>
        </form>
      </div> */}
    </div>
  );
}

export default CreateServer;
