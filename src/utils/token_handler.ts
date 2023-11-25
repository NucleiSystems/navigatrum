/**
 * The function sets a token in the local storage.
 * @param {string} token - The `token` parameter is a string that represents a token value.
 */
export const setToken = async (token: string) => {
  await localStorage.setItem("token", token);
};

/**
 * The function sets the expiration time for a token in the local storage.
 * @param {string} expireTime - The `expireTime` parameter is a string that represents the expiration
 * time of a token.
 */
export const setTokenExpire = async (expireTime: string) => {
  await localStorage.setItem("token-expire", expireTime);
};

/**
 * The function fetchToken retrieves a token from the localStorage and returns it as a string or null
 * if it doesn't exist.
 * @returns The function `fetchToken` returns a string value if there is a token stored in the
 * `localStorage`, otherwise it returns `null`.
 */
export const fetchToken = async () => {
  return await localStorage.getItem("token");
};

/**
 * The function `expTime` calculates the expiration time by adding 30 days to the current date and
 * time.
 * @returns The function `expTime` returns the current date and time in seconds, plus a time difference
 * of 30 days.
 */
export const expTime = () => {
  const date = Date.now();
  const timeDiff = 60 * 60 * 24 * 30;
  return date / 1000 + timeDiff;
};
