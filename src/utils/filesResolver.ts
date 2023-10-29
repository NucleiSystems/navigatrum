import axios from "axios";
import extractFiles from "./parser";
import endpoints from "./endpointConfig";
import filesType from "../interfaces/fileInterface";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

const requestFilesRequest = async () => {
  return await axios.get(endpoints().endpoints.file_request, {
    headers: headers,
  });
};

const getUserDataAmount = async () => {
  return await axios.get(endpoints().endpoints.user_data, {
    headers: headers,
  });
};

const requestRedisCache = async () => {
  const redisFetchResponse = await axios.get(
    endpoints().endpoints.redis_fetch,
    {
      headers: headers,
    }
  );

  const file_count = (await getUserDataAmount()).data.user_data_length;

  if (file_count > redisFetchResponse.data) {
    const fetchFilesResponse = await requestFilesRequest();
    if (fetchFilesResponse.status === 202) {
      const secondResponse = await axios.get(
        // Use a different variable name to avoid conflict
        endpoints().endpoints.redis_fetch,
        {
          headers: headers,
        }
      );
      return await extractFiles(secondResponse.data);
    }
  } else {
    return await extractFiles(redisFetchResponse.data);
  }
};

export { requestFilesRequest, getUserDataAmount, requestRedisCache };
