import axios from "axios";
import extractFiles from "./parser";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

/**
 * The function `requestFilesRequest` makes an asynchronous request to fetch all data from a specific
 * URL using the axios library.
 * @returns The function `requestFilesRequest` is returning a promise that resolves to the result of
 * the `axios.get` request.
 */
const requestFilesRequest = async () => {
  return await axios.get("https://nucleibackend.systems/data/sync/fetch/all", {
    headers: headers,
  });
};

/**
 * The function `getUserDataAmount` makes an asynchronous HTTP GET request to fetch user data from a
 * specific URL.
 * @returns The function `getUserDataAmount` is returning the result of the `axios.get` request.
 */
const getUserDataAmount = async () => {
  return await axios.get(
    "https://nucleibackend.systems/data/sync/fetch/user_data",
    {
      headers: headers,
    }
  );
};

let secondRequestMade = false;

/**
 * The function `requestRedisCache` makes an asynchronous request to fetch data from a Redis cache and
 * extracts files from the response.
 * @returns The function `requestRedisCache` returns the result of calling the `extractFiles` function
 * on the response data.
 */
const requestRedisCache = async () => {
  const response = await axios.get(
    "https://nucleibackend.systems/data/sync/fetch/redis/all",
    {
      headers: headers,
    }
  );

  if (response.data === null) {
    if (!secondRequestMade) {
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
