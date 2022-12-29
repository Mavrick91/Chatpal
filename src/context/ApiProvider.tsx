import { createContext, ReactNode, useContext, useMemo } from "react";
import axios, { AxiosInstance } from "axios";

const ApiContext = createContext<AxiosInstance | null>(null);

type Props = {
  children: ReactNode;
};

const ApiProvider = ({ children }: Props) => {
  const axiosClient = useMemo(
    () =>
      axios.create({
        baseURL: "http://localhost:3000",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    []
  );

  return <ApiContext.Provider value={axiosClient}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === null) {
    throw new Error("useApi must be used within a ApiProvider");
  }
  return context;
};

export default ApiProvider;
