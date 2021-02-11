import React, { useContext, useState, useEffect, useRef } from "react";
import firebase from "firebase";
import { formatDistance, format } from "date-fns";
import { ServerContext } from "../context/Server";
import { URL } from "../Api/api";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "./css/Chat.css";
import { formatRelative } from "date-fns/esm";

const chatUserColors = ["pink", "orange", "#ffdsb9", "#d80709"];

const skeleton_chat = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Chat() {
  const { crntChannel, chats } = useContext(ServerContext);
  const chatContainer = useRef();

  const [crntMessage, setCrntMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestInitializeApp();
  }, []);

  const requestInitializeApp = async () => {
    try {
      const response = await axios.post(`${URL}/chat/getchannelref`, {});
      if (response.status === 201) {
        const app = response.data.app;
        firebase.initializeApp(app);
        const db = firebase.firestore();
        const docRef = db
          .collection("channels")
          .doc("979a8e96-4f22-4a84-92b6-431b96223b4f-general");
        const doc = await docRef.get();
        console.log(doc.data());
      }
      setLoading(false);
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
    // TODO: send a message
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
      <div className="chat">
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
        {chats.map((chat, index) => {
          const isDiffrentDate =
            index === 0 ||
            new Date(chat.timestamp).getDate() !==
              new Date(chats[index - 1].timestamp).getDate();
          const isFirstMsgByUser =
            index === 0 ||
            chat.sender.username !== chats[index - 1].sender.username;
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
                    {format(chat.timestamp, "HH ' : ' mm")}
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
                      {formatDistance(chat.timestamp, new Date(), {
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
