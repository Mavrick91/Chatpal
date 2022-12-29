import { useQuery } from "@tanstack/react-query";
import { useApi } from "../context/ApiProvider";
import { Message } from "../types/message";

const useGetAllMessages = () => {
  const clientApi = useApi();

  return useQuery(
    ["getAllMessages"],
    (): Promise<Message[]> => clientApi.get("/getAllMessages").then((res) => res.data)
  );
};

export default useGetAllMessages;
