import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SocketState {
  data: any;
  [key: string]: any;
}

const initialState: SocketState = {
  data: null,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    getListChannel(state, action: PayloadAction<any>) {
      state.data = action.payload.params;
    },
    error(state) {
      state.data = null;
    },
  },
});

export const { getListChannel, error } = channelSlice.actions;

export default channelSlice.reducer;
