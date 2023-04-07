import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { v1 as uuidv1 } from "uuid";
import { RootState } from "../../app/store/rootSotre";
import { useSocket } from "../../hooks/useWebsocket";
import "./MessageInput.scss";

export default function MessageInput() {
  const [message, setMessage] = useState<string>("");
  const [enterMessage, setEnterMessage] = useState<string>("");
  const userId = localStorage.getItem("userId");
  const userInfo = JSON.parse(window.localStorage.getItem("user"));
  const roomId: any = useSelector((state: RootState) => state.channel.roomId);
  const [messageArray, setMessageArray] = useState<any>([]);
  const [onPaste, setOnPaste] = useState<boolean>(false);

  const [messageArrayEnter, setMessageArrayEnter] = useState<any>([]);

  const [indexMessage, setIndexMessage] = useState<number>(0);
  const { sendJsonMessage, lastJsonMessage } = useSocket();
  // let newArray = useRef([]);
  let tempArray = useRef([]);

  let text = useRef("");
  let count = useRef(1);
  let index = useRef(0);
  let step = useRef(0);
  let startCut = useRef(0);

  const handlechangeMessage = (e: any) => {
    let value = e.target.value;
    setMessage(e.target.value);
    // console.log(startCut.current);
    if (value.length > 0) {
    }
    if (!onPaste) {
      for (let index = startCut.current; index <= value.length; index++) {
        const element = value[index];
        tempArray.current[step.current] = value.substr(
          startCut.current,
          value.length
        );
        // console.log(tempArray.current[step.current].replace(/[^\n]/g, "").length)
        setMessageArrayEnter(tempArray.current);
        if (
          tempArray.current[step.current].replace(/[^\n]/g, "").length % 4 ===
            0 &&
          tempArray.current[step.current].replace(/[^\n]/g, "").length !== 0
        ) {
          step.current++;
          startCut.current = value.length;
        }
      }
    } else {
      cutMessage(
        value.substr(
          startCut.current > 0 ? startCut.current - 1 : 0,
          value.length
        )
      );
      setOnPaste(false);
    }
    // if (value.length === 0) {
    //   count.current = 1;
    //   step.current = 0;
    //   text.current = "";
    //   startCut.current = 0;
    // }

    // if (!onPaste) {
    //   if (value[value.length - 1] === "\n") {
    //     text.current += value.substr(startCut.current, value.length);
    //     startCut.current = value.length;
    //     console.log("=====");
    //     console.log(tempArray.current);
    //     console.log("=====");

    //     if (count.current <= 1 && messageArrayEnter.length <= 0) {
    //       console.log("1");
    //       tempArray.current.push({ insert: text.current });
    //       setMessageArrayEnter(tempArray.current);
    //     } else {
    //       tempArray.current[step.current] = { insert: text.current };
    //       setMessageArrayEnter(tempArray.current);
    //     }

    //     if (count.current % 5 === 0) {
    //       step.current++;
    //       text.current = "";
    //     }
    //     count.current++;
    //   }
    // } else {
    //   cutMessage(
    //     value.substr(
    //       startCut.current > 0 ? startCut.current - 1 : 0,
    //       value.length
    //     )
    //   );
    //   setOnPaste(false);
    // }

    // console.log(result);
    //    for(let i =0 ; i<value.length;i++){
    //    }

    // splitStrings(value)
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
    // //   console.log(messageArray);s
    // } else {
    //   //   setMessage(e.target.value);
    // }

    // // console.log(messageArray);
  };

  const cutMessage = (value: string) => {
    // console.log(message);

    let fullText = "";
    let newArray = [];

    const result = splitStringsEnter(value);

    if (result.length > 0) {
      for (let index = 1; index <= result.length; index++) {
        fullText = fullText + (result[index - 1] ? result[index - 1] : "");
        // console.log(fullText);
        if (index % 5 === 0 && index !== 0 && fullText !== undefined) {
          newArray.push({
            insert: index > 5 ? fullText.substr(1, fullText.length) : fullText,
          });
          fullText = "";
        } else if (index === result.length && fullText.length > 0) {
          newArray.push({
            insert: fullText.substr(1, fullText.length),
          });
          fullText = "";
        }
      }
    }

    // console.log("==============NEW ARRAY====================");
    // console.log(newArray);
    // console.log(newArray);
    for (let index = 0; index <= newArray.length; index++) {
      tempArray.current[step.current] = newArray[index]?.insert;
      step.current++;
    }
    step.current--;
    startCut.current = tempArray.current.join().length;

    setMessageArrayEnter(tempArray.current);
  };
  // console.log(tempArray.current[indexMessage]);
  //////
  // console.log(tempArray.current);
  const cutMessageByLimit = (value: string) => {
    // console.log(message);

    let fullText = "";
    let newArray = [];

    const result = splitStrings(value);
    console.log("=======================OLD ARRAY====================");
    console.log(result);
    console.log("=======================OLD ARRAY====================");

    if (result.length > 0) {
      for (let index = 0; index <= result.length; index++) {
        fullText = fullText + (result[index] ? result[index] : "");
        console.log(fullText);
        if (index % 5 === 0 && index !== 0 && fullText !== undefined) {
          newArray.push({
            insert: fullText,
          });
          fullText = "";
        } else if (index === result.length && fullText.length > 0) {
          newArray.push({
            insert: fullText,
          });
          fullText = "";
        }
      }
    }

    console.log("==============NEW ARRAY====================");
    console.log(newArray);
    setMessageArray([...messageArray, ...newArray]);
  };

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
    return result;
  };

  const splitStringsEnter = (str: string) => {
    const result = [];
    let startIndex = 0;
    let endIndex = 0;
    while (startIndex <= str.length) {
      let substring = str;
      if (str[startIndex] === "\n") {
        substring = str.substring(endIndex, startIndex);
        endIndex = startIndex;
        result.push(substring);
      } else if (startIndex === str.length) {
        substring = str.substring(endIndex, startIndex);
        endIndex = startIndex;
        result.push(substring);
      }
      startIndex++;
    }
    // console.log('+=======')
    // console.log(result);
    // console.log('+=======')

    return result;
  };

  const sliceToNewArray = (str: string) => {
    const result = [];
    let startIndex = 0;
    let maxLines = 5;
    let maxTextForLine = 10;
    let fullText = "";

    while (startIndex < str.length) {
      let substring = str.substr(startIndex, maxTextForLine);
      if (substring.trim().length === 0) {
        startIndex += maxTextForLine;
        continue;
      }
      if (substring.length === maxTextForLine) {
        let endIndex = startIndex + maxTextForLine;
        while (
          endIndex < str.length &&
          str[endIndex] !== " " &&
          str[endIndex] !== "\t"
        ) {
          endIndex++;
        }
        substring = str.substring(startIndex, endIndex);
      }
      fullText += substring.trim() + "\n";
      startIndex += substring.length;
    }
    // console.log(fullText);
    return fullText;
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
    // cutMessage(message);
    // cutMessageByLimit(message)
    // sendJsonMessage(param);
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

  const filterMess = messageArrayEnter.filter((mess: any) => {
    return mess !== "" && mess;
  });

  console.log(filterMess);
  return (
    <>
      <div className="message-input-container">
        <textarea
          onPaste={() => {
            setOnPaste(true);
          }}
          onKeyDown={(e) => checkOnKeyUp(e)}
          onChange={handlechangeMessage}
        />
        {/* <button onClick={handleSendMessage}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/6532/6532019.png"
            alt=""
          />
        </button> */}
        <div></div>
      </div>
      {/* Gioi han ky tu */}
      {/* <div className="message-test-page">
        <div className="message-test-page--message">
          {messageArray.length > 0
            ? messageArray[indexMessage]?.insert.replace("undefined", "")
            : enterMessage}
        </div>
        <button
          onClick={() => {
            if (indexMessage > 0) {
              setIndexMessage(indexMessage - 1);
            }
          }}
        >
          lui{" "}
        </button>
        <button
          onClick={() => {
            if (indexMessage < messageArray?.length) {
              setIndexMessage(indexMessage + 1);
            }
          }}
        >
          next{" "}
        </button>
        {indexMessage}/
        {messageArray.length > 1
          ? messageArray.length - 1
          : messageArray.length}
      </div> */}
      Enter line
      <div className="message-test-page">
        <div className="message-test-page--message">
          {filterMess[indexMessage] &&
          filterMess[indexMessage].indexOf("\n") === 0
            ? filterMess[indexMessage].substr(
                1,
                filterMess[indexMessage].length
              )
            : filterMess[indexMessage]}
        </div>
        <button
          onClick={() => {
            if (indexMessage > 0) {
              setIndexMessage(indexMessage - 1);
            }
          }}
        >
          lui{" "}
        </button>
        <button
          onClick={() => {
            if (indexMessage < messageArrayEnter?.length) {
              setIndexMessage(indexMessage + 1);
            }
          }}
        >
          next{" "}
        </button>
      </div>
    </>
  );
}
