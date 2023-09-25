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
let secondRequestMade = false;

const requestRedisCache = async () => {
  const response = await axios.get(
    "https://nucleibackend.systems/data/sync/fetch/redis/all",
    {
      headers: headers,
    }
  );

  if (response.data === null) {
    if (!secondRequestMade) {
      // Check if the second request has already been made
      secondRequestMade = true; // Set the flag to true to prevent further requests
      if ((await requestFilesRequest()).status === 202) {
        const secondResponse = await axios.get(
          // Use a different variable name to avoid conflict
          "https://nucleibackend.systems/data/sync/fetch/redis/all",
          {
            headers: headers,
          }
        );
        return await extractFiles(secondResponse.data);
      }
    }
  } else {
    return await extractFiles(response.data);
  }
};

export { requestFilesRequest, getUserDataAmount, requestRedisCache };
