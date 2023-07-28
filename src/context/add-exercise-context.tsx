/**
 * This is essentially just a global store to assist when
 * adding exercises to a routine. This is needed as the process
 * of adding exercises crosses multiple page components and passing
 * state around is messy.
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

export const useAddExerciseContext = () => {
  const { isAdding, setIsAdding, exercisesToAdd, setExercisesToAdd } =
    useContext(AddExerciseContext);

  const addOneExercise = (exerciseId: string) => {
    setExercisesToAdd((prev) => {
      const listClone = Object.assign([], prev);
      listClone.push(exerciseId);
      return listClone;
    });
  };

  const removeOneExercise = (exerciseId: string) => {
    setExercisesToAdd((prev) => {
      return prev.filter((e) => e !== exerciseId);
    });
  };

  const hasBeenSelected = (exerciseId: string) => {
    return exercisesToAdd.includes(exerciseId);
  };

  return {
    isAdding,
    setIsAdding,
    exercisesToAdd,
    setExercisesToAdd,
    addOneExercise,
    removeOneExercise,
    hasBeenSelected,
  };
};
