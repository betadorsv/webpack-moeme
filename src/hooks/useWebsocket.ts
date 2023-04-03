import { AppDispatch } from "../app/store/rootSotre";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { signOutLocalStorage } from "../utils/LoginUtils";
import * as ptCommand from "../constants/ptCommant";
import * as ptGroup from "../constants/ptGroup";
import { LastMessageSocket } from "../models/socket";
import { getListChannel } from "./channelSlice";

const SOCKET_URL = "wss://moeme-web-dev.aveapp.com";
export const useSocket = () => {
  const [socketUrl, setSocketUrl] = useState(SOCKET_URL);
  const dispatch = useDispatch<AppDispatch>();
  let history = useHistory();
  /**
   * init Socket
   */
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"), // on Socket Open
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });

  const getListChannelSuccess = (data: LastMessageSocket) => {
    if (data.result === "success") {
      dispatch(getListChannel(data)); // save list channel in to redux
    } else {
      toast.error(data.result);
    }
  };

  /**
   * Send param get list Channel
   */
  const handleGetListChannel = () => {
    let userId = localStorage.getItem("userId");
    let param = {
      ptGroup: ptGroup.CHANNEL_LISTS,
      ptCommand: ptCommand.CHANNEL_LISTS,
      params: {
        userId: userId,
      },
    };
    sendJsonMessage(param);
  };

  /**
   *
   * @param data Last message socket
   */
  const regsiterSocketSuccess = (data: LastMessageSocket) => {
    console.log(data);
    if (data.result === "success") {
      handleGetListChannel();
    } else {
      toast.error(data.reason || "Pls check token and try again");
    }
  };

  const createChannelSuccess = (data: LastMessageSocket) => {
    if (data.result === "success") {
      toast.success("Create channel success.");
      handleGetListChannel(); //get and  update listchannel after create success
    } else {
      toast.error(data.reason || "Create channel error");
    }
  };

  /**
   * Check socket message no have ptCommand
   * @param data
   */
  const checkMessageResponse = (data: LastMessageSocket) => {
    if (data.result === "error") {
      if (data.reason === "token_invalid") {
        toast.error("Token invalid pls login again");
        signOutLocalStorage();
        history.push("/login");
      }
    }
  };
  /**
   * On Listen socket message event
   */
  useEffect(() => {
    if (lastJsonMessage) {
      let message:any = lastJsonMessage
      console.log(lastJsonMessage)
      switch (lastJsonMessage?.ptCommand) {
        case ptCommand.LOGIN: // Create Channel
          break;
        case ptCommand.CHANNEL_LISTS: // Get List Channel
          getListChannelSuccess(lastJsonMessage);
          break;
        case ptCommand.REGISTER_SOCKET: // Regsiter Socket
          regsiterSocketSuccess(lastJsonMessage);
          break;
        case ptCommand.CREATE_ROOM_CHANNEL: // createRoom Socket
          createChannelSuccess(lastJsonMessage);
          break;
        default:
          checkMessageResponse(lastJsonMessage);
          break;
      }
    }
  }, [lastJsonMessage]);
  return {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  };
};
