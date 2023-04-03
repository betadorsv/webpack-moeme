import LoginView from "layouts/Login";
import HomeView from "layouts/Home";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import store from "./app/store/rootSotre";

import { Provider } from "react-redux";
import { getAccessToken } from "services/TokenService";

import Header from "../src/components/Header";
import useWebSocket, { ReadyState } from "react-use-websocket";

const ContentWrapper = ({ children }: any) => (
  <div className="content-page">{children}</div>
);

function MoeMe() {

  return (
    <Router>
      <Header />
      <ContentWrapper>
        <Switch>
          <Route path="/login">
            <LoginView />
          </Route>

          <Route path="/home">
            <HomeView />
          </Route>
          <Redirect path="*" to="/login" />
        </Switch>
      </ContentWrapper>
    </Router>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MoeMe />
    </Provider>
  );
}
