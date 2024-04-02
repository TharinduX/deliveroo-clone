/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { userInfo, accessToken } = action.payload;
      state.user = userInfo;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
