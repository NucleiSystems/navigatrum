import { configureStore } from "@reduxjs/toolkit";
import tokenStore from "./slices/tokenStore";
import fileStore from "./slices/fileStore";

export default configureStore({
  reducer: {
    token: tokenStore,
    files: fileStore,
  },
});
