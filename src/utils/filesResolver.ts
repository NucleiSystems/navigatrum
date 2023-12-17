import axios from "axios";
import extractFiles from "./parser";
import endpoints from "./endpointConfig";
import { fetchToken } from "./token_handler";

const requestFilesRequest = async () => {
  const token = await fetchToken();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(await endpoints().endpoints.file_request, {
    headers: await headers,
  });
};

const getUserDataAmount = async () => {
  const token = await fetchToken();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(endpoints().endpoints.user_data, {
    headers: await headers,
  });
};

const requestRedisCache = async () => {
  const token = await fetchToken();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const redisFetchResponse = await axios.get(
    endpoints().endpoints.redis_fetch,
    {
      headers: await headers,
    }
  );

  const file_count = (await getUserDataAmount()).data.user_data_length;

  if (file_count > redisFetchResponse.data) {
    const fetchFilesResponse = await requestFilesRequest();
    if (fetchFilesResponse.status === 202) {
      const secondResponse = await axios.get(
        endpoints().endpoints.redis_fetch,
        {
          headers: await headers,
        }
      );
      return await extractFiles(secondResponse.data);
    }
  } else {
    return await extractFiles(redisFetchResponse.data);
  }
};

export { requestFilesRequest, getUserDataAmount, requestRedisCache };
