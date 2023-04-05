import React, { useEffect, useState } from "react";
import "./MessageInput.scss";
import { v1 as uuidv1 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/rootSotre";
import { useSocket } from "../../hooks/useWebsocket";
import { LastMessageSocket } from "../../models/socket";
import toast from "react-hot-toast";

export default function MessageInput() {
  const [message, setMessage] = useState<string>("");
  const userId = localStorage.getItem("userId");
  const userInfo = JSON.parse(window.localStorage.getItem("user"));
  const roomId: any = useSelector((state: RootState) => state.channel.roomId);
  const { sendJsonMessage, lastJsonMessage } = useSocket();

  const handlechangeMessage = (e: any) => {
    let value = e.target.value;
    setMessage(e.target.value);

    // let messageArray = []; // Array save text if overflow
    // let maxLines = 5;
    // let maxTextForLine = 10;
    // let maxOfString = maxLines * maxTextForLine;
    // let demoMax = 0;

    // if (value.length > maxLines * maxTextForLine) {
    //     splitStrings(value)
    // //   for (let i = 0; i < value.length; i += maxOfString) {
    // //     let subString = value.substr(i, maxOfString);

    // //     let finalText = subString.substr(
    // //       0,
    // //       Math.min(subString.length, subString.lastIndexOf(" "))
    // //     );

    // //     messageArray.push(finalText);
    // //   }
    // //   console.log(messageArray);
    // } else {
    //   //   setMessage(e.target.value);
    // }

    // // console.log(messageArray);
  };

  //////

  const splitStrings = (str: any) => {
    const result = [];
    let startIndex = 0;
    let maxLines = 5;
    let maxTextForLine = 10;
    let maxOfString = maxLines * maxTextForLine;

    while (startIndex < str.length) {
      let substring = str.substr(startIndex, maxOfString);
      if (substring.trim().length === 0) {
        startIndex += maxOfString;
        continue;
      }
      if (substring.length === maxOfString) {
        let endIndex = startIndex + maxOfString;
        while (
          endIndex < str.length &&
          str[endIndex] !== " " &&
          str[endIndex] !== "\t"
        ) {
          endIndex++;
        }
        substring = str.substring(startIndex, endIndex);
      }
      result.push(substring.trim());
      startIndex += substring.length;
    }
  };
  //////

  /**
   * Check click enter to send message
   * @param e
   */
  const checkOnKeyUp = (e: any) => {
    //check empty messages
    if (
      e.target.value.length > 0 &&
      e.target.value !== "\n" &&
      e.target.value.trim()
    ) {
      //   setDisableBtnSend(false);
      if (e.key === "Enter" && !e.shiftKey && e.keyCode === 13) {
        handleSendMessage(); //handle send message

        e.preventDefault();
      }
    } else {
      //   setDisableBtnSend(true);
    }
  };

  const handleSendMessage = () => {
    let param = {
      ptCommand: 327682,
      ptGroup: 327680,
      ptDevice: "",
      params: {
        chatId: uuidv1(),
        messageType: "0",
        userName: userInfo.userName,
        message: message,
        userId: userId,
        roomId: roomId,
        chatType: "0",
      },
    };
    sendJsonMessage(param);
    setMessage(""); //reset input message
  };

  const registerSocket = () => {
    let atk = localStorage.getItem("atk"); //accessToken
    let param = {
      ptCommand: 65543,
      ptGroup: 65536,
      ptDevice: "",
      params: {
        atk: atk,
      },
    };
    sendJsonMessage(param);
  };

  const handleCheckEnter = (e: any) => {
    if (e.which == 13) {
      handleSendMessage();
    }
  };

  useEffect(() => {
    registerSocket();
  }, []);

  return (
    <div className="message-input-container">
      <textarea
        onKeyDown={(e) => checkOnKeyUp(e)}
        onChange={handlechangeMessage}
        value={message}
      />
      <button onClick={handleSendMessage}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/6532/6532019.png"
          alt=""
        />
      </button>
    </div>
  );
}
