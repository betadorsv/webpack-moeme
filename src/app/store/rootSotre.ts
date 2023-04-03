import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../layouts/Login/loginSlice"
import channelReducer from "../../hooks/channelSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
