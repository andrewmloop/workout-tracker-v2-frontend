/**
 * A global store for adding new exercises to a routine
 */

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IAddExerciseContext {
  isAdding: boolean;
  setIsAdding: Dispatch<SetStateAction<boolean>>;
  exercisesToAdd: string[];
  setExercisesToAdd: Dispatch<SetStateAction<string[]>>;
}

const AddExerciseContext = createContext<IAddExerciseContext>({
  isAdding: false,
  setIsAdding: () => {},
  exercisesToAdd: [],
  setExercisesToAdd: () => {},
});

export function AddExerciseProvider({ children }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [exercisesToAdd, setExercisesToAdd] = useState<string[]>([]);

  return (
    <AddExerciseContext.Provider
      value={{ isAdding, setIsAdding, exercisesToAdd, setExercisesToAdd }}
    >
      {children}
    </AddExerciseContext.Provider>
  );
}

export const useAddExerciseContext = () => useContext(AddExerciseContext);
