import React from "react";
import { useHistory } from "react-router-dom";
import { signOutLocalStorage } from "../../utils";
import "./userSetting.scss";
export default function UserSetting() {
  let history = useHistory();

  const handleLogout = () => {
    signOutLocalStorage();
    history.push("/login");
  };
  return (
    <div className="user-setting">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
