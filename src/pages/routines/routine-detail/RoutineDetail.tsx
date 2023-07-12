import { Link, useLocation, useNavigate } from "react-router-dom";
import "./RoutineDetail.css";
import { RoutineDto } from "../../../entities/routine";
import { useEffect, useState } from "react";
import { useExerciseContext } from "../../../context/exercise-context";
import TopNav from "../../../components/top-nav/TopNav";
import { useAddExerciseContext } from "../../../context/add-exercise-context";
import { fetchApi } from "../../../utils/fetch-util";
import { ROUTES } from "../../../utils/route-enums";

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
  const navigate = useNavigate();

  const { isAdding, setIsAdding, exercisesToAdd, setExercisesToAdd } =
    useAddExerciseContext();
  // Get the list of exercises and build a populated list from
  // exerciseIds in routine's "exercises" field
  const { exerciseList } = useExerciseContext();

  const [routineState, setRoutineState] = useState(routine);
  const [routineExerciseList, setRoutineExerciseList] = useState<
    RoutineItemState[]
  >([]);

  useEffect(() => {
    populateRoutineExercises();
  }, [routineState]);

  const populateRoutineExercises = () => {
    const list: RoutineItemState[] = [];

    for (let exercise of routineState.exercises) {
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

  const handleAddExercise = () => {
    setIsAdding(true);
    setExercisesToAdd([]);
    navigate("/exercises");
  };

  const handleAddComplete = async () => {
    setIsAdding(false);

    try {
      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        exerciseIds: exercisesToAdd,
      });

      const response = await fetchApi(
        ROUTES.ROUTINE_ID_ADD.replace(":id", routineState._id),
        {
          method: method,
          headers: headers,
          body: body,
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setRoutineState(data);
      } else if (response.status === 401) {
        navigate("/auth/signin");
      } else {
        throw new Error(data);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setExercisesToAdd([]);
    }
  };

  const handleEditRoutine = () => {
    return;
  };

  const handleEditTargets = () => {};

  return (
    <>
      <TopNav showBackButton={true} navText={routine.name} />
      <div className="routine-detail-page page-container">
        <div className="routine-description-container">
          <p className="routine-description">{routine.description}</p>
        </div>
        <div className="routine-desc-buttons-container">
          {isAdding ? (
            <button
              className="complete-button desc-button"
              onClick={handleAddComplete}
            >
              Complete
            </button>
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
            Edit
          </button>
          <button
            onClick={handleEditTargets}
            className="targets-button desc-button"
          >
            Targets
          </button>
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
    </>
  );
}

function RoutineExercise(props: RoutineItemState) {
  return (
    <div className="routine-exercise-container">
      <p className="routine-exercise-name">{props.exerciseName}</p>
      <LogButton
        exerciseId={props.exerciseId}
        exerciseName={props.exerciseName}
      />
      {/* <input
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
      /> */}
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
