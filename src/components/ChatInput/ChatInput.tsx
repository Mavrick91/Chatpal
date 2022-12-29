import { FormEvent, useCallback, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { v4 as uuidv4 } from "uuid";

import useSaveMessage from "../../endpoints/useSaveMessage";
import { Message } from "../../types/message";
import InvisibleButton from "../Button";

const ChatInput = () => {
  const [inputValue, setInputValue] = useState("");

  const { mutate: saveMessage } = useSaveMessage();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formattedMessage: Message = {
        message: inputValue.trim(),
        date: new Date().toISOString(),
        id: uuidv4(),
      };

      saveMessage(formattedMessage);
      setInputValue("");
    },
    [inputValue, saveMessage]
  );

  return (
    <form data-testid="chat-input-form" onSubmit={handleSubmit}>
      <div className="w-full border-2 justify-between border-solid border-[#707070] py-2 px-4 h-16 flex items-center rounded-xl text-white">
        <input
          className="border-none w-full bg-transparent outline-none"
          data-testid="message-input"
          placeholder="Write your message..."
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <InvisibleButton disabled={!inputValue} testId="button-submit" type="submit">
          <SendIcon />
        </InvisibleButton>
      </div>
    </form>
  );
};

export default ChatInput;
