import { RefObject } from "react";

const useScrollToBottom = (containerRef: RefObject<HTMLDivElement>) => {
  const scrollToBottom = () => {
    if (containerRef?.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  return scrollToBottom;
};

export default useScrollToBottom;
