import React, { useContext, useRef } from "react";
import { FullUser } from "twitter-d";

import { useUserData } from "api/useUserData";

type ProviderType = {
  user: FullUser | undefined;
};

export const UserContext = React.createContext<ProviderType>({
  user: undefined,
});

export const useUser = (): ProviderType => {
  return useContext(UserContext);
};

export const UserConsumer = UserContext.Consumer;

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useUserData();

  return (
    <UserContext.Provider
      value={{
        user: data,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
