import { useEffect, useLayoutEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useSocket } from "../../context/SocketIOProvider";
import useGetAllMessages from "../../endpoints/useGetAllMessages";
import useScrollToBottom from "../../hooks/useScrollToBottom";
import { Message } from "../../types/message";

const ChatConversation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useScrollToBottom(containerRef);
  const { data: messages } = useGetAllMessages();
  const clientQuery = useQueryClient();
  const socket = useSocket();

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    socket.on("new_message", (message: Message) => {
      clientQuery.setQueryData(["getAllMessages"], (oldMessage: Message[] | undefined) => [
        ...(oldMessage || []),
        message,
      ]);
    });

    return () => {
      socket.off("new_message");
    };
  }, [clientQuery, scrollToBottom, socket]);

  return (
    <div
      className="flex-grow border-2 border-solid border-[#707070] rounded-xl p-4 shadow-lg shadow-[#1c212a] overflow-auto"
      data-testid="conversation-container"
      ref={containerRef}
    >
      <div className="flex flex-col gap-4">
        {messages?.map((message) => (
          <div className="flex gap-4" data-testid="message" key={message.id}>
            <div className="h-16 aspect-square shadow-md shadow-black rounded-full bg-white"></div>
            <div className="flex flex-grow flex-col gap-2">
              <div className="text-[#A8ACAE] text-lg">Jean marie</div>
              <div className="max-w-[33%] bg-white rounded-md p-4 flex flex-col gap-3 shadow-md shadow-black">
                <p className="">{message.message}</p>
                <div className="text-xs self-end">{new Date(message.date).toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatConversation;
