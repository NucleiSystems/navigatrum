import { createSlice } from "@reduxjs/toolkit";
import filesType from "../interfaces/fileInterface";

export const initialState = {
  files: <filesType>(<unknown>[]),
  fileCount: 0,
  fetched: false,
};

export const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setFileCount: (state, action) => {
      state.fileCount = action.payload;
    },
    setFetched: (state, action) => {
      state.fetched = action.payload;
    },
  },
});

export const { setFiles, setFileCount, setFetched } = fileSlice.actions;

export default fileSlice.reducer;
