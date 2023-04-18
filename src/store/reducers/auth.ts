import { createSlice } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
  id: string;
  imageUrl: string | null;
}

export interface Auth {
  user: User;
  token: string;
  expiresIn: number;
  expirationTime: string;
  isLoggedIn: boolean;
}

const initialState: Auth = {
  user: { username: "", email: "", id: "", imageUrl: "" },
  token: "",
  expiresIn: 0,
  expirationTime: "",
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    authenticate(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = !!state.token;
      state.user = action.payload.user;
      return;
    },
    logout(state) {
      state.token = "";
      state.isLoggedIn = false;
      state.user = initialState.user;
    },
  },
});
