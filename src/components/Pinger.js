import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/Auth";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import "./css/Pinger.css";

let servers = [
  {
    server_name: "Personal of Phoenix",
    server_icon: "https://picsum.photos/52/52?random=1",
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
          channel_name: "programming help",
          unread: false,
        },
        {
          channel_name: "off topic",
          unread: false,
        },
        {
          channel_name: "bot spam",
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
  const [crntChannel, setCrntChannel] = useState(crntServer.channels.text[0]);

  useEffect(() => {
    setCrntChannel(crntServer.channels.text[0]);
  }, [crntServer]);
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
          <div className="channels__textchannels">
            <div className="channels__textchannels_toogler">
              <div className="channels__textchannels_tooglerTextCont">
                <div className="channels__textchannels_tooglerTextIndicator">
                  {">"}
                </div>
                <div className="channels__textchannels_tooglerText">
                  Text Channels
                </div>
              </div>
              <div className="channels__textchannels_tooglerAdd">+</div>
            </div>
            {crntServer.channels.text.map((channel) => {
              const isActive = crntChannel === channel;
              return (
                <div
                  className={
                    isActive ? "textchannel__cont active" : "textchannel__cont"
                  }
                  onClick={() => setCrntChannel(channel)}
                >
                  {channel.unread && (
                    <div className="textchannel__unread"></div>
                  )}
                  <div className="textchannel__icon">#</div>
                  <div className="textchannel__name">
                    {channel.channel_name}
                  </div>
                  <div className="textchannel__addIcon">
                    <PersonAddIcon fontSize="inherit" />
                  </div>
                  <div className="textchannel__settingsIcon">
                    <SettingsIcon fontSize="inherit" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="channels__voicechannels">
            <div className="channels__textchannels_toogler">
              <div className="channels__textchannels_tooglerTextCont">
                <div className="channels__textchannels_tooglerTextIndicator">
                  {">"}
                </div>
                <div className="channels__textchannels_tooglerText">
                  Voice Channels
                </div>
              </div>
              <div className="channels__textchannels_tooglerAdd">+</div>
            </div>
            {crntServer.channels.voice.map((channel) => {
              const isActive = crntChannel === channel;
              return (
                <div
                  className={
                    isActive ? "textchannel__cont active" : "textchannel__cont"
                  }
                  onClick={() => setCrntChannel(channel)}
                >
                  {channel.unread && (
                    <div className="textchannel__unread"></div>
                  )}
                  <div className="textchannel__icon">#</div>
                  <div className="textchannel__name">
                    {channel.channel_name}
                  </div>
                  <div className="textchannel__addIcon">
                    <PersonAddIcon fontSize="inherit" />
                  </div>
                  <div className="textchannel__settingsIcon">
                    <SettingsIcon fontSize="inherit" />
                  </div>
                </div>
              );
            })}
          </div>
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
