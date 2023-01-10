import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
export const SocketContext = createContext();

export const SocketProvider = ({ children, uri, options }) => {
  const [socketIo, setSocketIo] = useState();
  const { sendToast } = useToastContext();

  useEffect(() => {
    const socket = io(uri, options);
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });
    socket.on("response", () => {
      console.log("Response", socket.id);
    });
    socket.on("message", (data) => {
      sendToast(data);
    });
    setSocketIo(socket);
  }, []);

  return (
    <SocketContext.Provider value={socketIo}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
