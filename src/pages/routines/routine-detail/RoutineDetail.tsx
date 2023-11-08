import { Link, useLocation, useNavigate } from "react-router-dom";
import { RoutineDTO } from "../../../entities/routine";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useExerciseContext } from "../../../context/exercise-context";
import TopNav from "../../../components/top-nav/TopNav";
import { useAddExerciseContext } from "../../../context/add-exercise-context";
import FinishAddingButton from "../../../components/finish-adding-button/FinishAddingButton";
import { useRoutineContext } from "../../../context/routine-context";

import "./RoutineDetail.css";
import { deleteExerciseFromRoutine } from "../../../services/routine-service";

interface RoutineItemState {
  routineId: string;
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: number;
}

export default function RoutineDetail() {
  // Get routine passed from previous route
  const location = useLocation();
  const routine: RoutineDTO = location.state;

  const navigate = useNavigate();
  const { isAdding, setIsAdding, setExercisesToAdd, setRoutineId } =
    useAddExerciseContext();
  const { routineList, getRoutineExercises } = useRoutineContext();
  // Get the list of exercises and build a populated list from
  // exerciseIds in routine's "exercises" field
  const { exerciseList } = useExerciseContext();
  const [routineExerciseList, setRoutineExerciseList] = useState<
    RoutineItemState[]
  >([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    populateRoutineExercises();
  }, [routineList]);

  const populateRoutineExercises = () => {
    const list: RoutineItemState[] = [];

    const routineExercises = getRoutineExercises(routine._id);

    for (let exercise of routineExercises) {
      let fullExercise = exerciseList.find(
        (e) => e._id === exercise.exerciseId
      );
      if (fullExercise !== undefined)
        list.push({
          routineId: routine._id,
          exerciseId: fullExercise._id,
          exerciseName: fullExercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
        });
    }
    setRoutineExerciseList(list);
  };

  const handleAddExercise = () => {
    setIsAdding(true);
    setIsEditing(false);
    setExercisesToAdd([]);
    setRoutineId(routine._id);
    navigate("/exercises");
  };

  const handleEditRoutine = () => {
    setIsAdding(false);
    setIsEditing(!isEditing);
    return;
  };

  return (
    <>
      <TopNav showBackButton={true} navText={routine.name} />
      <div className="routine-detail-page page-container">
        <div className="routine-description-container">
          <p className="routine-description">{routine.description}</p>
        </div>
        <div className="routine-desc-buttons-container">
          {isAdding ? (
            <FinishAddingButton />
          ) : (
            <button
              onClick={handleAddExercise}
              className="add-button desc-button"
            >
              Add
            </button>
          )}
          <button
            onClick={handleEditRoutine}
            className="edit-button desc-button"
          >
            {isEditing ? "Done" : "Edit"}
          </button>
        </div>
        <div className="routine-exercise-list-container">
          {routineExerciseList.length > 0 &&
            routineExerciseList.map((exercise) => {
              return (
                <RoutineExercise
                  key={exercise.exerciseId}
                  routineId={routine._id}
                  exerciseId={exercise.exerciseId}
                  exerciseName={exercise.exerciseName}
                  sets={exercise.sets}
                  reps={exercise.reps}
                  isEditing={isEditing}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

type RoutineExercisePropType = {
  routineId: string;
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: number;
  isEditing: boolean;
};
function RoutineExercise(props: RoutineExercisePropType) {
  return (
    <div className="routine-exercise-container">
      <p className="routine-exercise-name">{props.exerciseName}</p>
      {props.isEditing ? (
        <DeleteExerciseButton
          routineId={props.routineId}
          exerciseId={props.exerciseId}
        />
      ) : (
        <LogButton
          exerciseId={props.exerciseId}
          exerciseName={props.exerciseName}
        />
      )}
    </div>
  );
}

type LogButtonPropType = { exerciseId: string; exerciseName: string };
function LogButton(props: LogButtonPropType) {
  return (
    <Link to={"/log"} state={props} className="log-button">
      Log
    </Link>
  );
}

type DeleteExerciseButtonPropType = {
  routineId: string;
  exerciseId: string;
};
function DeleteExerciseButton(props: DeleteExerciseButtonPropType) {
  const { updateRoutine } = useRoutineContext();

  const handleDelete = async () => {
    try {
      const newRoutine = await deleteExerciseFromRoutine(
        props.routineId,
        props.exerciseId
      );

      if (newRoutine instanceof Error) {
        throw newRoutine;
      }

      updateRoutine(newRoutine);
      // TODO: Add successful delete notification
    } catch (error) {
      // TODO: Add unable to delete notification
      console.log(error);
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Delete
    </button>
  );
}
