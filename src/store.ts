import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenStore from "./slices/tokenStore";
import fileStore from "./slices/fileStore";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const tokenPersistConfig = {
  key: "token",
  storage,
};

const filePersistConfig = {
  key: "files",
  storage,
};

const tokenPersistedReducer = persistReducer(tokenPersistConfig, tokenStore);
const filePersistedReducer = persistReducer(filePersistConfig, fileStore);

const rootReducer = combineReducers({
  token: tokenPersistedReducer,
  files: filePersistedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
