import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/Auth";
import "./css/Pinger.css";

let servers = [
  {
    server_name: "Personal of Phoenix",
    server_icon:
      "https://cdn1.iconfinder.com/data/icons/social-media-vol-3-2/24/_p_copy-256.png",
    server_poster: "https://picsum.photos/250/100",
    channels: {
      text: [
        {
          channel_name: "general",
          unread: true,
        },
        {
          channel_name: "notifier",
          unread: false,
        },
      ],
      voice: [
        {
          channel_name: "voice1",
          available: false,
        },
        {
          channel_name: "voice 2",
          available: true,
        },
      ],
    },
    boosted: false,
  },
  {
    server_name: "Programming Humor",
    server_icon: "https://picsum.photos/50/50",
    server_poster: "https://picsum.photos/250/100",
    channels: {
      text: [
        {
          channel_name: "general",
          unread: true,
        },
        {
          channel_name: "notifier",
          unread: false,
        },
      ],
      voice: [
        {
          channel_name: "voice1",
          available: false,
        },
        {
          channel_name: "voice 2",
          available: true,
        },
      ],
    },
    boosted: false,
  },
];
servers.push(servers[0]);
servers.push(servers[0]);
servers.push(servers[0]);
servers.push(servers[0]);

export default function Pinger() {
  const { user, logout } = useContext(UserContext);

  const [crntServer, setCrntServer] = useState(servers[0]);
  return (
    <div className="pinger">
      <div className="pinger__serverbar">
        <div className="serverbar__main">
          <div className="serverbar__main__textCont">P</div>
        </div>
        <div className="serverbar__servers">
          {servers.map((server) => {
            return (
              <button
                className="serverbar__server"
                onClick={() => setCrntServer(server)}
              >
                <img
                  src={server.server_icon}
                  alt={server.server_name.slice(0, 2).toUpperCase()}
                  width="50px"
                  height="50px"
                  className="server__icon"
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="pinger__channelbar">
        <div className="channelbar__poster">
          <img
            src={crntServer.server_poster}
            alt={crntServer.server_name}
            className="channels__poster"
          />
          <div className="channels__serverName">{crntServer.server_name}</div>
        </div>
      </div>
      <div className="pinger__chatbar">
        <div className="chatbar__navbar">
          <button onClick={logout}>Log out</button>
        </div>
      </div>
      <div className="pinger__usersbar"></div>
    </div>
  );
}
