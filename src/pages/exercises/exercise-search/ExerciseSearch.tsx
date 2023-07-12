import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ExerciseDto } from "../../../entities/exercise";
import "./ExerciseSearch.css";
import { useExerciseContext } from "../../../context/exercise-context";
import TopNav from "../../../components/top-nav/TopNav";
import { useAddExerciseContext } from "../../../context/add-exercise-context";

export default function ExerciseSearch() {
  const params = useParams();
  const muscle = params.muscle || "all";

  const { isAdding, setExercisesToAdd } = useAddExerciseContext();
  // List of exercises fetched when user logins
  const { exerciseList } = useExerciseContext();
  // Filtered list to exercises that only contain the route's designated
  // muscle
  const [filteredList, setFilteredList] = useState<ExerciseDto[]>([]);
  const [inputState, setInputState] = useState("");
  const [debounceState, setDebounceState] = useState("");

  useEffect(() => {
    if (muscle === "all") {
      setFilteredList(exerciseList);
    } else {
      setFilteredList(
        exerciseList.filter((exercise) => {
          return (
            exercise.primaryMuscles.includes(muscle) ||
            exercise.secondaryMuscles.includes(muscle)
          );
        })
      );
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceState(inputState);
    }, 250);
    return () => clearTimeout(timeoutId);
  }, [inputState, 250]);

  return (
    <>
      <TopNav
        showBackButton={true}
        navText={
          isAdding
            ? "Add Exercises"
            : muscle === "all"
            ? "All Exercises"
            : capitalize(muscle)
        }
      />
      <div className="exercise-search-page page-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search exercises"
            onChange={(e) => setInputState(e.target.value)}
          />
        </div>
        <div className="exercise-list-container">
          {filteredList
            .filter((e) => {
              if (inputState === "") return true;
              return e.name.toLowerCase().includes(debounceState.toLowerCase());
            })
            .map((e) => {
              return <Exercise key={e._id} exercise={e} />;
            })}
        </div>
      </div>
    </>
  );
}

type ExerciseProps = { exercise: ExerciseDto };
function Exercise(props: ExerciseProps) {
  const { exercise } = props;
  const { isAdding, addOneExercise, removeOneExercise, hasBeenSelected } =
    useAddExerciseContext();

  const isSelected = hasBeenSelected(exercise._id);

  return (
    <div className="exercise-container">
      <Link to="/exercises/detail" state={exercise} className="exercise-link">
        <p className="exercise-text">{exercise.name}</p>
      </Link>

      {isAdding && isSelected ? (
        <button
          className="remove-button"
          onClick={() => removeOneExercise(exercise._id)}
        >
          Remove
        </button>
      ) : (
        <button
          className="add-button"
          onClick={() => addOneExercise(exercise._id)}
        >
          Add
        </button>
      )}
    </div>
  );
}

function capitalize(string: string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}
