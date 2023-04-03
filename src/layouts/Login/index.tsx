import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "../../app/store/rootSotre";
import useWebSocket, { ReadyState } from "react-use-websocket";
import * as ptCommand from "../../constants/ptCommant";
import * as ptGroup from "../../constants/ptGroup";

import "./login.scss";
import { setLoginLocalStorage } from "../../utils/LoginUtils";
import { login } from "./loginSlice";
import { useSocket } from "../../hooks/useWebsocket";
import toast from "react-hot-toast";
import { LastMessageSocket } from "../../models/socket";

export default function Login() {
  let history = useHistory();
  const { sendJsonMessage } = useSocket();

  /**
   * Check empty and send param login socket
   * @param e
   */
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (e.target[1].value.length <= 0 || e.target[0].value.length <= 0) {
      toast.error("khong duoc de trong");
    } else {
      let param = {
        ptGroup: ptGroup.LOGIN,
        ptCommand: ptCommand.LOGIN,
        params: {
          userId: e.target[0].value,
          userPassword: e.target[1].value,
          deviceType: "web",
        },
      };
      sendJsonMessage(param);
    }
  };

  useEffect(() => {
    const isLoggedIn: boolean = localStorage.getItem("userId") ? true : false;
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, []);

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleLogin}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>User ID</label>
            <input
              type="text"
              name="userId"
              className="form-control mt-1"
              placeholder="Enter User Id"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
