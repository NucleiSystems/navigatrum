import { createSlice } from "@reduxjs/toolkit";

interface filesType {
  file_name: string;
  file_bytes: any;
  data: any;
  file_data: string;
  id: any;
}

const initialState = {
  files: [],
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
