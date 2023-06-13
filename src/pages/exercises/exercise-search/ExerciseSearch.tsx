import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "../../../utils/route-enums";
import { ExerciseDto } from "../../../entities/exercise";
import "./ExerciseSearch.css";

export default function ExerciseSearch() {
  const params = useParams();
  const muscle = params.muscle || "all";

  // List of exercises fetched on component creation
  const [fetchedState, setFetchedState] = useState<ExerciseDto[]>([]);
  const [inputState, setInputState] = useState("");
  const [debounceState, setDebounceState] = useState("");

  useEffect(() => {
    fetchExercises(muscle);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceState(inputState);
    }, 250);
    return () => clearTimeout(timeoutId);
  }, [inputState, 250]);

  async function fetchExercises(muscle: string): Promise<void> {
    let exerciseUrl =
      muscle === "all"
        ? "http://localhost:3000/" + ROUTES.EXERCISE
        : "http://localhost:3000/" + ROUTES.EXERCISE_MUSCLE + muscle;
    try {
      const response = await fetch(exerciseUrl, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImUyZUBlbWFpbC5jb20iLCJzdWIiOiI2NDZkNjc4NDk1MzRmYzUxY2I0YjcxZWQiLCJpYXQiOjE2ODYwNzcyMDEsImV4cCI6MTY4NjY4MjAwMX0.jtHMWSaXbYTkGZ9cSs-LtN53ZWuNDBliwyXKDStJBwo",
        },
      });
      const data: ExerciseDto[] = await response.json();

      console.log(data);
      setFetchedState(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="exercise-search-container">
      <div className="search-container">
        <input type="text" onChange={(e) => setInputState(e.target.value)} />
      </div>
      <div className="exercise-list-container">
        {fetchedState
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
