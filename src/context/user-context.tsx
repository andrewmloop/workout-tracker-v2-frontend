import { createContext, useContext, useState } from "react";
import { UserDto } from "../entities/user";

interface IUserContext {
  user: UserDto | undefined;
  setUser: (user: UserDto) => void;
}

const UserContext = createContext<IUserContext>({
  user: undefined,
  setUser: () => {},
});

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<UserDto>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
