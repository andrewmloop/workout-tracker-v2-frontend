import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ExerciseDto } from "../../../entities/exercise";
import "./ExerciseSearch.css";
import { useExerciseContext } from "../../../context/exercise-context";

export default function ExerciseSearch() {
  const params = useParams();
  const muscle = params.muscle || "all";

  // List of exercises fetched when user logins
  const { exerciseList } = useExerciseContext();
  // Filtered list to exercises that only contain the route's designated
  // muscle
  const [filteredList, setFilteredList] = useState<ExerciseDto[]>([]);
  const [inputState, setInputState] = useState("");
  const [debounceState, setDebounceState] = useState("");

  useEffect(() => {
    console.log(exerciseList.length);
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
    <div className="exercise-search-container">
      <div className="search-container">
        <input type="text" onChange={(e) => setInputState(e.target.value)} />
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
  );
}

type ExerciseProps = { exercise: ExerciseDto };
function Exercise(props: ExerciseProps) {
  const { exercise } = props;

  return (
    <Link
      to="/exercises/detail"
      state={exercise}
      className="exercise-container"
    >
      <div className="exercise-text">{exercise.name}</div>
    </Link>
  );
}
