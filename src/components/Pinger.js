import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/Auth";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import SettingsVoiceIcon from "@material-ui/icons/SettingsVoice";
import HeadsetIcon from "@material-ui/icons/Headset";
import "./css/Pinger.css";

let servers = [
  {
    id: "1",
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
    users: [
      {
        username: "Phoenix Creation",
        avatar_url: "https://picsum.photos/40/40?random=1",
        presence: "Fighting with bugs🐛",
        status: "online",
        type: "bot",
      },
      {
        username: "Patel Het",
        avatar_url: "https://picsum.photos/40/40?random=2",
        presence: "Playing with some games",
        status: "online",
        type: "person",
      },
      {
        username: "Patel Zeel",
        avatar_url: "https://picsum.photos/40/40?random=3",
        presence: "Thinking something",
        status: "offline",
        type: "person",
      },
    ],
  },
  {
    id: "2",
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
        {
          channel_name: "voice1",
          available: false,
        },
        {
          channel_name: "voice 2",
          available: true,
        },
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
    users: [
      {
        username: "Phoenix Creation",
        avatar_url: "https://picsum.photos/40/40?random=1",
        presence: "Fighting with bugs🐛",
        status: "online",
        type: "bot",
      },
      {
        username: "Patel Het",
        avatar_url: "https://picsum.photos/40/40?random=2",
        presence: "Playing with some games",
        status: "online",
        type: "person",
      },
      {
        username: "Patel Het",
        avatar_url: "https://picsum.photos/40/40?random=5",
        presence: "Playing with some apps",
        status: "typing",
        type: "person",
      },
      {
        username: "Patel Zeel",
        avatar_url: "https://picsum.photos/40/40?random=3",
        presence: "Thinking something",
        status: "offline",
        type: "person",
      },
    ],
  },
];
servers.push({ ...servers[0], id: "3" });
servers.push({ ...servers[0], id: "4" });
servers.push({ ...servers[0], id: "5" });
// servers.push({ ...servers[0], id: "6" });
// servers.push({ ...servers[0], id: "7" });
// servers.push({ ...servers[0], id: "8" });
// servers.push({ ...servers[0], id: "9" });
let temp = servers[0];
servers[0] = servers[1];
servers[1] = temp;

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
            const isCurrent = crntServer == server;
            return (
              <div
                className="serverbar__server"
                onClick={() => setCrntServer(server)}
              >
                {isCurrent && (
                  <div className="serverbar__server__current"></div>
                )}
                <img
                  src={server.server_icon}
                  alt={server.server_name.slice(0, 2).toUpperCase()}
                  width="50px"
                  height="50px"
                  className="server__icon"
                />
              </div>
            );
          })}
        </div>
        <div className="serverbar__addserver">
          <div
            className="serverbar__addicon"
            onClick={() => {
              console.log("Add server....");
            }}
          >
            <AddIcon style={{ fontSize: 40, color: "green" }} />
          </div>
        </div>
      </div>
      <div className="pinger__channelbar">
        <div className="channelbar__poster">
          <img
            src={crntServer.server_poster}
            alt={crntServer.server_name}
            className="channels__poster"
          />
        </div>
        <div className="channels">
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
                  {channel.available && (
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
        <div className="currentUser__cont">
          <div className="currentUser__avatar__cont">
            <img
              src={user?.avatar_url}
              alt="add it idiot"
              className="currentUser__avatar__img"
            />
            <div className={"currentUser__avatar__status " + user.status}></div>
          </div>
          <div className="currentUser__userinfo">
            <div className="currentUser__username">{user?.username}</div>
            <div className="currentUser__presence">{user?.presence}</div>
          </div>
          <div className="currentUser__options">
            <div className="currentUser__option__mic">
              <SettingsVoiceIcon fontSize="inherit" />
            </div>
            <div className="currentUser__option__speaker">
              <HeadsetIcon fontSize="inherit" />
            </div>
            <div className="currentUser__option__settings">
              <SettingsIcon fontSize="inherit" />
            </div>
          </div>
        </div>
      </div>
      <div className="pinger__chatbar">
        <div className="chatbar__navbar">
          <button onClick={logout}>Log out</button>
        </div>
      </div>
      <div className="pinger__usersbar">
        <div className="userbar__onlineusers">
          <div className="userbar__onlineuserText">
            {"Online Members - " +
              crntServer.users.reduce((total, current) => {
                if (current.status !== "offline") {
                  return total + 1;
                } else {
                  return total;
                }
              }, 0)}
          </div>
          {crntServer.users.map((user) => {
            if (user.status === "offline") {
              return;
            }

            return (
              <div className="userbar__user">
                <div className="userbar__avatar__cont">
                  <img
                    src={user.avatar_url}
                    alt={user.username.slice(0, 2).toUpperCase()}
                    className="userbar__user__avatarimg"
                  />
                  {user.status === "typing" ? (
                    <div className="userbar__user__statusTyping"></div>
                  ) : (
                    <div className="userbar__user__statusOnline"></div>
                  )}
                </div>
                <div className="userbar__user__userdetails">
                  <div className="userbar__user__username">{user.username}</div>
                  <div className="userbar__user__presence">{user.presence}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="userbar__offlineusers">
          <div className="userbar__offlineuserText">
            {"Offline Members - " +
              crntServer.users.reduce((total, current) => {
                if (current.status === "offline") {
                  return total + 1;
                } else {
                  return total;
                }
              }, 0)}
          </div>
          {crntServer.users.map((user) => {
            if (user.status !== "offline") {
              return;
            }

            return (
              <div className="userbar__user">
                <div className="userbar__avatar__cont">
                  <img
                    src={user.avatar_url}
                    alt={user.username.slice(0, 2).toUpperCase()}
                    className="userbar__user__avatarimg"
                  />
                  <div className="userbar__user__statusOffline"></div>
                </div>
                <div className="userbar__user__userdetails">
                  <div className="userbar__user__username offline">
                    {user.username}
                  </div>
                  <div className="userbar__user__presence">{user.presence}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
