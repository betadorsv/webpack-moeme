import React, { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./channelTalk.scss";
const MAX_TEXT = 250; // about max charcater in 1 page

export default function ChannelTalk() {
  const [message, setMessage] = useState<string>("");
  const [messageEdit, setMessageEdit] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [onPaste, setOnpaste] = useState<boolean>(false);

  const [arrayMessage, setArrayMessage] = useState<any>([]);
  const [messageArray, setMessageArray] = useState<any>([]);
  const [currentInput, setCurrentInput] = useState<number>(0);

  const messArr = useRef([]);
  const startCut = useRef(0);
  const indexArr = useRef(0);

  const onChangeMessage = (e) => {
    let value = e.target.value;
    if (onPaste) {
      let result = cutMessageByLimit(value);
      messArr.current.push(...result);
      setMessage("");
      setOnpaste(false);
    } else {
      /**
       * get text of page 1 if if the text is as long as the specified limit and  only slice text
       * find the nearest white space at the bounds to cut
       */

      if (
        (value.length === MAX_TEXT && value[value.length - 1] === " ") ||
        (value.length > MAX_TEXT && value[value.length - 1] === " ")
      ) {
        let result = cutMessageByLimit(value);
        messArr.current.push(...result);
        setMessage("");
        setCurrentInput(currentInput + 1);
        value = "";
      } else {
        setMessage(value);
      }
    }
  };

  /**
   * cut messsage is as long as the specified limit
   * @param value message
   * @returns
   */
  const cutMessageByLimit = (value: string) => {
    let fullText = "";
    let newArray = [];

    const result = splitStrings(value);
    if (result.length > 0) {
      for (let index = 1; index <= result.length + 1; index++) {
        fullText = fullText + (result[index - 1] ? result[index - 1] : "");
        if (index % 5 === 0 && index !== 0 && fullText !== undefined) {
          //text mod 5 (5 is limit line)
          newArray.push({
            insert: fullText,
          });
          fullText = "";
        } else if (index === result.length + 1 && fullText.length > 0) {
          newArray.push({
            insert: fullText,
          });
          fullText = "";
        }
      }
    }

    setMessageArray([...messageArray, ...newArray]);
    return newArray;
  };

  const splitStrings = (str: any) => {
    const result = [];
    let startIndex = 0;

    let maxOfString = 50; //max Of String in 1 line;

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
    console.log(result);
    return result;
  };

  /**
   * On edit message
   * when edit only edit in this page, can't enter long more than number of limited 
   * @param e
   */
  const onEditMessage = (e) => {
    let value = e.target.value;
    if (value.length < MAX_TEXT) {
      setMessageEdit(value);
      messArr.current[currentInput].insert = value;
      setArrayMessage(messArr);
    } else {
      setMessageEdit(value.substr(0, MAX_TEXT));
      messArr.current[currentInput].insert = value.substr(0, MAX_TEXT);
      setArrayMessage(messArr);
    }
  };

  return (
    <div className="channel-talk">
      <p>Tối đa 5 dòng, mỗi dòng giới hạn 50 ký tự ( có thể thay đổi)</p>
      {message.length > 250 && (
        <p style={{ color: "red" }}>Chuan bi nhay sang trang moi</p>
      )}
      <div className="channel-talk--input">
        {currentInput === messageArray.length ? (
          <textarea
            autoFocus
            value={message}
            onChange={onChangeMessage}
            onPaste={() => setOnpaste(true)}
          />
        ) : (
          <textarea
            value={edit ? messageEdit : messageArray[currentInput]?.insert}
            onChange={onEditMessage}
            disabled={!edit}
          />
        )}
        {currentInput + 1}/ {messageArray.length + 1}
        <div className="channel-talk--input--action">
          <button
            onClick={() => {
              if (currentInput > 0) {
                setCurrentInput(currentInput - 1);
                setEdit(false);
              }
            }}
          >
            Back
          </button>
          <button
            onClick={() => {
              if (currentInput < messageArray.length) {
                setCurrentInput(currentInput + 1);
                setEdit(false);
              }
            }}
          >
            Next
          </button>
          <button
            onClick={() => {
              setMessageEdit(messageArray[currentInput]?.insert);
              setEdit(true);
            }}
          >
            Edit
          </button>
        </div>
      </div>

      <div className="channel-talk--show">
        {messageArray.map((mess, index) => (
          <p key={index}>
            {mess.insert} -{mess.insert.length} - page: {index + 1}
            <br></br>
            <strong>=================================================</strong>
          </p>
        ))}
      </div>
      {/* <div className="channel-talk--input--action">
        <button>Back</button>
        <button>Next</button>
      </div> */}
    </div>
  );
}
