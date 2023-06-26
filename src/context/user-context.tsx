import { createContext, useContext, useState } from "react";
import { UserDto } from "../entities/user";

interface IUserContext {
  userStore: UserDto | undefined;
  setUserStore: (user: UserDto) => void;
}

const UserContext = createContext<IUserContext>({
  userStore: undefined,
  setUserStore: () => {},
});

export function UserProvider({ children }: any) {
  const [userStore, setUserStore] = useState<UserDto>();

  return (
    <UserContext.Provider value={{ userStore, setUserStore }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
