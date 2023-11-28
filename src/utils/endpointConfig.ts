import EndpointObject from "../interfaces/endpointsInterface";

const mode: string = "prod";

const endpoint_object = (mode: string): EndpointObject => {
  return {
    endpoints: {
      login: `https://${mode}/users/token`,
      register: `https://${mode}/users/register`,
      file_request: `https://${mode}/data/sync/fetch/all`,
      user_data: `https://${mode}/data/sync/fetch/user_data`,
      redis_fetch: `https://${mode}/data/sync/fetch/redis/all`,
      upload: `https://${mode}/storage/compress/image?ipfs_flag=true`,
    },
  };
};

const endpoints = (): EndpointObject => {
  if (mode === "dev") {
    return endpoint_object("localhost:8000");
  } else if (mode === "prod") {
    return endpoint_object("nucleibackend.systems");
  }
};

export default endpoints;
