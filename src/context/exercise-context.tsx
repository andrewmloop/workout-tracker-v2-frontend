import { createContext, useContext, useState } from "react";
import { ExerciseDto } from "../entities/exercise";

interface IExerciseContext {
  exerciseList: ExerciseDto[];
  setExerciseList: (exercise: ExerciseDto[]) => void;
}

const ExerciseContext = createContext<IExerciseContext>({
  exerciseList: [],
  setExerciseList: () => {},
});

export function ExerciseProvider({ children }: any) {
  const [exerciseList, setExerciseList] = useState<ExerciseDto[]>([]);

  return (
    <ExerciseContext.Provider value={{ exerciseList, setExerciseList }}>
      {children}
    </ExerciseContext.Provider>
  );
}

export const useExerciseContext = () => useContext(ExerciseContext);
