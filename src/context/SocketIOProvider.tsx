import { createContext, ReactNode, useContext } from "react";
import io, { Socket } from "socket.io-client";

const socket = io("http://localhost:3000/");

const SocketIoContext = createContext<Socket | null>(null);

type Props = {
  children: ReactNode;
};

const SocketIOProvider = ({ children }: Props) => (
  <SocketIoContext.Provider value={socket}>{children}</SocketIoContext.Provider>
);

export const useSocket = () => {
  const socket = useContext(SocketIoContext);
  if (socket === null) {
    throw new Error("useSocket must be used within a SocketIOProvider");
  }

  return socket;
};

export default SocketIOProvider;
