import { Link, useLocation } from "react-router-dom";
import "./RoutineDetail.css";
import { RoutineDto } from "../../../entities/routine";
import { useEffect, useState } from "react";
import { useExerciseContext } from "../../../context/exercise-context";

interface RoutineItemState {
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: number;
}

export default function RoutineDetail() {
  // Get routine passed from previous route
  const location = useLocation();
  const routine: RoutineDto = location.state;

  // Get the list of exercises and build a populated list from
  // exerciseIds in routine's "exercises" field
  const { exerciseList } = useExerciseContext();
  const [routineExerciseList, setRoutineExerciseList] = useState<
    RoutineItemState[]
  >([]);

  useEffect(() => {
    populateRoutineExercises();
  }, []);

  const populateRoutineExercises = () => {
    const list: RoutineItemState[] = [];

    for (let exercise of routine.exercises) {
      let fullExercise = exerciseList.find(
        (e) => e._id === exercise.exerciseId
      );
      if (fullExercise !== undefined)
        list.push({
          exerciseId: fullExercise._id,
          exerciseName: fullExercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
        });
    }
    setRoutineExerciseList(list);
  };

  return (
    <div className="routine-detail-page-container">
      <div className="routine-description-container">
        <p className="routine-description">{routine.description}</p>
      </div>
      <div className="routine-exercise-list-container">
        {routineExerciseList.length > 0 &&
          routineExerciseList.map((exercise) => {
            return (
              <RoutineExercise
                key={exercise.exerciseId}
                exerciseId={exercise.exerciseId}
                exerciseName={exercise.exerciseName}
                sets={exercise.sets}
                reps={exercise.reps}
              />
            );
          })}
      </div>
    </div>
  );
}

function RoutineExercise(props: RoutineItemState) {
  return (
    <div className="routine-exercise-container">
      <p className="routine-exercise-name">{props.exerciseName}</p>
      <input
        type="text"
        maxLength={4}
        defaultValue={props.sets}
        className="sets-input"
      />
      <input
        type="text"
        maxLength={4}
        defaultValue={props.reps}
        className="reps-input"
      />
      <LogButton exerciseId={props.exerciseId} />
    </div>
  );
}

type LogButtonPropType = { exerciseId: string };
function LogButton(props: LogButtonPropType) {
  return (
    <Link to={"/log"} state={props.exerciseId} className="log-button">
      Log
    </Link>
  );
}
