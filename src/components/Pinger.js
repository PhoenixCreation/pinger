import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/Auth";
import { ServerContext } from "../context/Server";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import SettingsVoiceIcon from "@material-ui/icons/SettingsVoice";
import HeadsetIcon from "@material-ui/icons/Headset";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./css/Pinger.css";
import Chat from "./Chat";

export default function Pinger() {
  const { user, logout } = useContext(UserContext);
  const {
    servers,
    crntServer,
    setCrntServer,
    crntChannel,
    setCrntChannel,
  } = useContext(ServerContext);

  const [showTextChannels, setShowTextChannels] = useState(true);
  const [showVoiceChannels, setShowVoiceChannels] = useState(true);

  return (
    <div className="pinger">
      <div className="pinger__serverbar">
        <div className="serverbar__main">
          <div className="serverbar__main__textCont">P</div>
        </div>
        <div className="serverbar__servers">
          {servers.map((server) => {
            const isCurrent = crntServer === server;
            return (
              <div
                className={
                  isCurrent ? "serverbar__server active" : "serverbar__server"
                }
                onClick={() => setCrntServer(server)}
                key={server.id}
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
        <div className="chanels__main">
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
                <div
                  className="channels__textchannels_tooglerTextCont"
                  onClick={() => setShowTextChannels(!showTextChannels)}
                >
                  <div
                    className={
                      showTextChannels
                        ? "channels__textchannels_tooglerTextIndicator"
                        : "channels__textchannels_tooglerTextIndicator hidden"
                    }
                  >
                    <ArrowForwardIosIcon fontSize="inherit" />
                  </div>
                  <div className="channels__textchannels_tooglerText">
                    Text Channels
                  </div>
                </div>
                <div className="channels__textchannels_tooglerAdd">+</div>
              </div>
              {crntServer.channels.text.map((channel, index) => {
                const isActive = crntChannel === channel;
                return (
                  <div
                    className={
                      isActive
                        ? "textchannel__cont active"
                        : "textchannel__cont"
                    }
                    onClick={() => setCrntChannel(channel)}
                    key={channel.channel_name + index}
                    style={{ display: showTextChannels ? "flex" : "none" }}
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
                <div
                  className="channels__textchannels_tooglerTextCont"
                  onClick={() => setShowVoiceChannels(!showVoiceChannels)}
                >
                  <div
                    className={
                      showVoiceChannels
                        ? "channels__textchannels_tooglerTextIndicator"
                        : "channels__textchannels_tooglerTextIndicator hidden"
                    }
                  >
                    <ArrowForwardIosIcon fontSize="inherit" />
                  </div>
                  <div className="channels__textchannels_tooglerText">
                    Voice Channels
                  </div>
                </div>
                <div className="channels__textchannels_tooglerAdd">+</div>
              </div>
              {crntServer.channels.voice.map((channel, index) => {
                const isActive = crntChannel === channel;
                return (
                  <div
                    className={
                      isActive
                        ? "textchannel__cont active"
                        : "textchannel__cont"
                    }
                    onClick={() => setCrntChannel(channel)}
                    key={channel.channel_name + index}
                    style={{
                      display: showVoiceChannels ? "flex" : "none",
                    }}
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
        <Chat />
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
          {crntServer.users.map((user, index) => {
            if (user.status === "offline") {
              return null;
            }

            return (
              <div className="userbar__user" key={index + user.username}>
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
          {crntServer.users.map((user, index) => {
            if (user.status !== "offline") {
              return null;
            }

            return (
              <div className="userbar__user" key={index + user.username}>
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
