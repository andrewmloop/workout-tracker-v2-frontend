import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { RoutineDTO } from "../entities/routine";

interface IRoutineContext {
  routineList: RoutineDTO[];
  setRoutineList: Dispatch<SetStateAction<RoutineDTO[]>>;
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

export const useRoutineContext = () => {
  const { routineList, setRoutineList } = useContext(RoutineContext);

  const updateRoutine = (updatedRoutine: RoutineDTO) => {
    setRoutineList((prev: RoutineDTO[]) => {
      return prev.map((routineInList) =>
        routineInList._id === updatedRoutine._id
          ? updatedRoutine
          : routineInList
      );
    });
  };

  const removeRoutine = (routineIdToRemove: string) => {
    const updatedRoutineList = routineList.filter(
      (routineInList) => routineInList._id !== routineIdToRemove
    );
    setRoutineList(updatedRoutineList);
  };

  const getRoutineExercises = (routineId: string) => {
    const foundRoutine = routineList.find(
      (routine) => routine._id === routineId
    );

    if (foundRoutine) {
      return foundRoutine.exercises;
    } else {
      return [];
    }
  };

  const updateSetsOnRoutine = (
    routineId: string,
    exerciseId: string,
    numSets: number
  ) => {
    const updatedRoutineList = routineList.map(
      // Find routine in routine list by id
      (routineInList) => {
        if (routineInList._id === routineId) {
          const routineToUpdate = routineInList;
          const updatedExerciseList = routineToUpdate.exercises.map(
            // Find exercise in routine by id
            (exerciseOnRoutine) => {
              if (exerciseOnRoutine.exerciseId === exerciseId) {
                const exerciseToUpdate = exerciseOnRoutine;
                // Do the the update
                exerciseToUpdate.sets = numSets;
                return exerciseToUpdate;
              } else {
                return exerciseOnRoutine;
              }
            }
          );
          routineToUpdate.exercises = updatedExerciseList;
          return routineToUpdate;
        } else {
          return routineInList;
        }
      }
    );
    setRoutineList(updatedRoutineList);
  };

  const updateRepsOnRoutine = (
    routineId: string,
    exerciseId: string,
    numReps: number
  ) => {
    const updatedRoutineList = routineList.map(
      // Find routine in routine list by id
      (routineInList) => {
        if (routineInList._id === routineId) {
          const routineToUpdate = routineInList;
          const updatedExerciseList = routineToUpdate.exercises.map(
            // Find exercise in routine by id
            (exerciseOnRoutine) => {
              if (exerciseOnRoutine.exerciseId === exerciseId) {
                const exerciseToUpdate = exerciseOnRoutine;
                // Do the the update
                exerciseToUpdate.reps = numReps;
                return exerciseToUpdate;
              } else {
                return exerciseOnRoutine;
              }
            }
          );
          routineToUpdate.exercises = updatedExerciseList;
          return routineToUpdate;
        } else {
          return routineInList;
        }
      }
    );
    setRoutineList(updatedRoutineList);
  };

  return {
    routineList,
    setRoutineList,
    getRoutineExercises,
    updateRoutine,
    removeRoutine,
    updateSetsOnRoutine,
    updateRepsOnRoutine,
  };
};
