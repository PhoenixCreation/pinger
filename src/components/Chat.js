import React, { useContext, useState, useEffect, useRef } from "react";
import firebase from "firebase";
import { formatDistance, format } from "date-fns";
import { ServerContext } from "../context/Server";
import { UserContext } from "../context/Auth";
import { URL } from "../Api/api";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "./css/Chat.css";

const chatUserColors = ["orange", "orange"];

const skeleton_chat = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let db;
let unsubscribe;

function Chat() {
  const { user } = useContext(UserContext);
  const { crntChannel, chats } = useContext(ServerContext);
  const chatContainer = useRef();

  const [chatArray, setChatArray] = useState([]);
  const [crntMessage, setCrntMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [crntChats, setCrntChats] = useState({});

  useEffect(() => {
    setLoading(true);
    requestInitializeApp();
  }, [crntChannel]);

  useEffect(() => {
    let tempchats = Object.keys(crntChats).map((key) => crntChats[key]);
    setChatArray(tempchats);
  }, [crntChats]);

  const requestInitializeApp = async () => {
    try {
      const response = await axios.post(`${URL}/chat/getchannelref`, {});
      if (response.status === 201) {
        const app = response.data.app;
        if (firebase.apps.length === 0) {
          firebase.initializeApp(app);
        }
        db = firebase.firestore();
        const docRef = db.collection("channels").doc(crntChannel.channel_id);
        if (unsubscribe) {
          unsubscribe();
        }
        unsubscribe = docRef.onSnapshot((snapshot) => {
          console.log(snapshot.data());
          setCrntChats(snapshot.data().chats);
          setLoading(false);
          chatContainer?.current.scrollTo(
            0,
            chatContainer.current.scrollTopMax
          );
        });
      }
    } catch (error) {
      console.log("Frontend requestchat => ", error);
    }
  };

  const handleChangeCrntMessage = (e) => {
    setCrntMessage(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setCrntMessage("");
    if (db) {
      const chatCount = Object.keys(crntChats).length;
      db.collection("channels")
        .doc(crntChannel.channel_id)
        .update({
          chats: {
            ...crntChats,
            [chatCount]: {
              type: "text",
              attachments: [],
              edited: false,
              id: `${crntChannel.channel_id}-${chatCount}`,
              message: crntMessage,
              timestamp: new Date().toString(),
              sender: {
                u_token: user.token,
                username: user.username,
                avatar_url: user.avatar_url,
              },
            },
          },
        });
    }
    console.log(crntMessage);
  };

  // useEffect(() => {
  //   chatContainer?.current.scrollTo(0, chatContainer.current.scrollTopMax);
  // }, [chats]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 4000);
  // }, []);

  if (loading) {
    return (
      <div className="chat" style={{ overflow: "hidden" }}>
        <div className="chat__skeleton__cont">
          {skeleton_chat.map((schat, index) => {
            return (
              <div className="skeleton__chat" key={index}>
                <div
                  className="skeleton__chat__avatar"
                  style={{ animationDelay: index / 10 + "s" }}
                ></div>
                <div className="skeleton__chat__right">
                  <div
                    className="skeleton__chat__user"
                    style={{
                      animationDelay: index / 10 - 1 + Math.random() + "s",
                    }}
                  ></div>
                  <div className="skeleton__chat__message"></div>
                  <div className="skeleton__chat__message"></div>
                  <div className="skeleton__chat__message"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="chat">
      <div className="messages__cont" ref={chatContainer}>
        {chatArray.map((chat, index) => {
          const isDiffrentDate =
            index === 0 ||
            new Date(chat.timestamp).getDate() !==
              new Date(chatArray[index - 1].timestamp).getDate();
          const isFirstMsgByUser =
            index === 0 ||
            chat.sender.username !== chatArray[index - 1].sender.username;
          const randomColorIndex = Math.floor(
            Math.random() * chatUserColors.length
          );
          return (
            <div className="message__cont" key={chat.id}>
              {isDiffrentDate && (
                <div className="message__datechange">
                  {format(new Date(chat.timestamp), "MM/dd/yyyy")}
                </div>
              )}

              {/* {isFirstMsgByUser && <div>This is first message by user</div>} */}
              <div className="message__avatar">
                {isFirstMsgByUser ? (
                  <img
                    src={chat.sender.avatar_url}
                    alt={chat.sender.username.slice(0, 2)}
                    className="message__avatar__img"
                  />
                ) : (
                  <div className="message__second__time">
                    {format(new Date(chat.timestamp), "HH ' : ' mm")}
                  </div>
                )}
              </div>
              <div className="message__chat">
                {isFirstMsgByUser && (
                  <div className="message__header">
                    <div
                      className="message__username"
                      style={{ color: chatUserColors[randomColorIndex] }}
                    >
                      {chat.sender.username}
                    </div>
                    <div className="message__timestamp">
                      {formatDistance(new Date(chat.timestamp), new Date(), {
                        includeSeconds: true,
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                )}
                <div
                  className={
                    isFirstMsgByUser
                      ? "message__message"
                      : "message__message other__message"
                  }
                >
                  {chat.message}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat__send__cont">
        <div className="chat__send__addbtn">
          <label className="chat__send__addicon" htmlFor="Add stuff">
            <input type="file" id="Add stuff" style={{ display: "none" }} />
            <AddIcon className="chat__send__addiconicon" fontSize="inherit" />
          </label>
        </div>
        <div className="chat__send__input__cont">
          <form className="chat__send__input__form" onSubmit={handleSubmitForm}>
            <input
              type="text"
              value={crntMessage}
              onChange={handleChangeCrntMessage}
              placeholder={"Message in #" + crntChannel?.channel_name}
              className="chat__send__input__field"
              required
            />
          </form>
        </div>
        <div className="chat__send__options">
          <div className="chat__send__option chat__send__option__gift">
            <CardGiftcardIcon fontSize="inherit" />
          </div>
          <div className="chat__send__option chat__send__option__gif">
            <GifIcon fontSize="inherit" />
          </div>
          <div className="chat__send__option chat__send__option__emoji">
            <InsertEmoticonIcon fontSize="inherit" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
