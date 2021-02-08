import React, { useState, createContext, useEffect } from "react";
import { requestCreateServer } from "../Api/api";

export const ServerContext = createContext();

let chatsDemo = [
  {
    id: "1",
    sender: {
      username: "alice",
      avatar_url: `https://picsum.photos/40/40?random=${Math.floor(
        Math.random() * 1000
      )}`,
    },
    timestamp: new Date(),
    type: "text",
    message: "This is going to be the first message.",
    attachments: [],
    edited: false,
  },
  {
    id: "2",
    sender: {
      username: "alice",
      avatar_url: `https://picsum.photos/40/40?random=${Math.floor(
        Math.random() * 1000
      )}`,
    },
    timestamp: new Date(2021, 0, 21, 4, 30),
    type: "text",
    message:
      "This is going to be the Second message. Also this will check the ability to handle the long messages. This is going to be the Second message. Also this will check the ability to handle the long messages.",
    attachments: [],
    edited: false,
  },
  {
    id: "3",
    sender: {
      username: "bob",
      avatar_url: `https://picsum.photos/40/40?random=${Math.floor(
        Math.random() * 1000
      )}`,
    },
    timestamp: new Date(2021, 0, 21, 4, 33),
    type: "text",
    message: "Hi! how yo doing alice?🤔",
    attachments: [],
    edited: false,
  },
  {
    id: "4",
    sender: {
      username: "alice",
      avatar_url: `https://picsum.photos/40/40?random=${Math.floor(
        Math.random() * 1000
      )}`,
    },
    timestamp: new Date(2021, 0, 21, 4, 34),
    type: "text",
    message: "I am doing great. How about you?",
    attachments: [],
    edited: true,
  },
  {
    id: "5",
    sender: {
      username: "bob",
      avatar_url: `https://picsum.photos/40/40?random=${Math.floor(
        Math.random() * 1000
      )}`,
    },
    timestamp: new Date(2021, 0, 21, 4, 35),
    type: "text",
    message: "Just going through some bugs which I know I will never find out.",
    attachments: [],
    edited: true,
  },
];

let serverDemo = [
  {
    id: "1",
    server_name: "Personal of Phoenix",
    server_icon: "https://picsum.photos/52/52?random=1",
    server_poster: "https://picsum.photos/250/100?random=2",
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

export const ServerProvider = (props) => {
  const [allServers, setAllServers] = useState(serverDemo);
  const [crntServer, setCrntServer] = useState(allServers[0]);
  const [crntChannel, setCrntChannel] = useState(crntServer.channels.text[0]);
  const [chats, setChats] = useState(chatsDemo);

  useEffect(() => {
    //Remove this.... this is temporary... remov when connect to database
    setChats([
      ...chats,
      {
        ...chats[0],
        id: Math.random() * 1000,
        sender: {
          username: "bob",
          avatar_url: `https://picsum.photos/40/40?random=${Math.floor(
            Math.random() * 1000
          )}`,
        },
      },
    ]);
  }, [crntChannel]);

  const createServer = async (newServer) => {
    if (newServer.server_name === "" || newServer.server_name === null) {
      return -1;
    }
    if (newServer.server_icon === null) {
      newServer.server_icon = "https://picsum.photos/60/60";
    }
    if (newServer.server_poster === null) {
      newServer.server_poster = "https://picsum.photos/250/100?random=3";
    }
    if (!newServer.user_id) {
      const token = localStorage.getItem("u_token");
      newServer.user_id = token;
    }
    newServer.boosted = false;
    requestCreateServer(newServer).then((data) => {
      console.log("context call data reciver", data);
      setAllServers((pastAllServers) => {
        return [...pastAllServers, data];
      });
      data.channels.text = Object.keys(data.channels.text).map(
        (key) => data.channels.text[key]
      );
      data.channels.voice = Object.keys(data.channels.voice).map(
        (key) => data.channels.voice[key]
      );
      setCrntServer(data);
    });
  };

  useEffect(() => {
    if (crntServer.channels) {
      setCrntChannel(crntServer?.channels.text[0]);
    }
  }, [crntServer]);

  return (
    <ServerContext.Provider
      value={{
        servers: allServers,
        crntServer,
        setCrntServer,
        crntChannel,
        setCrntChannel,
        chats,
        setChats,
        createServer,
      }}
    >
      {props.children}
    </ServerContext.Provider>
  );
};
