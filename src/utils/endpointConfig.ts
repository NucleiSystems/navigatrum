import EndpointObject from "../interfaces/endpointsInterface";

const mode: string = "dev";

const endpoint_object = (mode: string): EndpointObject => {
  return {
    endpoints: {
      login: `${mode}/users/token`,
      register: `${mode}/users/register`,
      file_request: `${mode}/data/sync/fetch/all`,
      user_data: `${mode}/data/sync/fetch/user_data`,
      redis_fetch: `${mode}/data/sync/fetch/redis/all`,
      upload: `${mode}/storage/compress/image?ipfs_flag=true`,
    },
  };
};

const endpoints = (): EndpointObject => {
  if (mode === "dev") {
    return endpoint_object("http://127.0.0.1:8000");
  } else if (mode === "prod") {
    return endpoint_object("https://nucleibackend.systems");
  }
};

export default endpoints;
