import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import FormCreateChannel from "../../components/FormCreateChannel";
import ListChannel from "../../components/ListChannel"
import "./Homepage.scss";

function index() {
  let history = useHistory();

  useEffect(() => {
    const isLoggedIn: boolean = localStorage.getItem("atk") ? true : false;
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, []);
  return (
    <div className="channel">
      <ListChannel />
      <FormCreateChannel />
    </div>
  );
}

export default index;
