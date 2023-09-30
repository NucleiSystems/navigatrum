import { createSlice } from "@reduxjs/toolkit";
import { setToken, setTokenExpire } from "../utils/token_handler";
import { expTime } from "../utils/token_handler";

const initialState = {
  token: "",
  expire: "",
  isLoggedIn: false,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      setToken(action.payload);
    },

    setExpire: (state) => {
      state.expire = expTime().toString();
      setTokenExpire(state.expire);
    },

    removeToken: (state) => {
      state.token = "";
      state.expire = "";
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("token-expire");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken, removeToken, setExpire } = tokenSlice.actions;

export default tokenSlice.reducer;
