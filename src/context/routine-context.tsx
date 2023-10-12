import { createContext, useContext, useState } from "react";
import { RoutineDTO } from "../entities/routine";

interface IRoutineContext {
  routineList: RoutineDTO[];
  setRoutineList: (routine: RoutineDTO[]) => void;
}

const RoutineContext = createContext<IRoutineContext>({
  routineList: [],
  setRoutineList: () => {},
});

export function RoutineProvider({ children }: any) {
  const [routineList, setRoutineList] = useState<RoutineDTO[]>([]);

  return (
    <RoutineContext.Provider value={{ routineList, setRoutineList }}>
      {children}
    </RoutineContext.Provider>
  );
}

export const useRoutineContext = () => useContext(RoutineContext);
