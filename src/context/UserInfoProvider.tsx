import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";

import { LoginResponse } from "../types/facebook";

type UserInfo = {
  userInfo: Partial<LoginResponse>;
  setUserInfo: Dispatch<SetStateAction<Partial<LoginResponse>>>;
};

const ApiContext = createContext<UserInfo | null>(null);

type Props = {
  children: ReactNode;
};

const UserInfoProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState({});

  const userInfoValue = useMemo(
    () => ({
      userInfo,
      setUserInfo,
    }),
    [userInfo]
  );

  return <ApiContext.Provider value={userInfoValue}>{children}</ApiContext.Provider>;
};

export const useUserInfo = () => {
  const context = useContext(ApiContext);
  if (context === null) {
    throw new Error("useUserInfo must be used within a UserInfoProvider");
  }
  return context;
};

export default UserInfoProvider;
