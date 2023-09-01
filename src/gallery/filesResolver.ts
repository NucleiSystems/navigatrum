import axios from "axios";
import extractFiles from "./parser";
import { store } from "../store";
import { useDispatch } from "react-redux";

import { setFiles, setFileCount, setFetched } from "../slices/fileStore";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

const requestFilesRequest = async () => {
  return await axios.get("https://nucleibackend.systems/data/sync/fetch/all", {
    headers: headers,
  });
};

const getUserDataAmount = async () => {
  return await axios.get(
    "https://nucleibackend.systems/data/sync/fetch/user_data",
    {
      headers: headers,
    }
  );
};

const requestRedisCache = async () => {
  const response = await axios.get(
    "https://nucleibackend.systems/data/sync/fetch/redis/all",
    {
      headers: headers,
    }
  );

  return await extractFiles(response.data);
};

export { requestFilesRequest, getUserDataAmount, requestRedisCache };
