import { useMutation } from "@tanstack/react-query";

import { useApi } from "../context/ApiProvider";
import { Message } from "../types/message";

const useSaveMessage = () => {
  const clientApi = useApi();

  return useMutation(["saveMessage"], (message: Message): Promise<void> => clientApi.post("/saveMessage", message));
};

export default useSaveMessage;
