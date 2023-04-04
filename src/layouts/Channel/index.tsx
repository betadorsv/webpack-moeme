import ListChannel from "components/ListChannel";
import { useSocket } from "../../hooks/useWebsocket";
import * as ptCommand from "../../constants/ptCommant";
import * as ptGroup from "../../constants/ptGroup";

import React, { useEffect } from "react";
import "./channel.scss";
import FormCreateChannel from "components/FormCreateChannel";
import AddChannel from "components/AddChannel";
export default function Channel() {
  const { sendJsonMessage } = useSocket();

  /**
   * Register socket before send message
   */
  const registerSocket = () => {
    let atk = localStorage.getItem("atk"); //accessToken
    let param = {
      ptCommand: ptCommand.REGISTER_SOCKET,
      ptGroup: ptGroup.REGISTER_SOCKET,
      ptDevice: "",
      params: {
        atk: atk,
      },
    };
    sendJsonMessage(param);
  };

  useEffect(() => {
    registerSocket();
  }, []);
  return (
    <div className="channel">
      <div className="channel-title">
        <h5>List Channels</h5>
        <AddChannel />
      </div>
      <ListChannel />
    </div>
  );
}
