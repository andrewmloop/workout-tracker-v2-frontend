import { useLocation } from "react-router-dom";
import { ExerciseDto } from "../../../entities/exercise";
import "./ExerciseDetail.css";

export default function ExerciseDetail() {
  const location = useLocation();
  const exercise: ExerciseDto = location.state;

  return (
    <div className="exercise-detail-container">
      <p className="name">{exercise.name}</p>
      {exercise.primaryMuscles.map((muscle, index) => (
        <p key={index} className="muscles">
          {muscle}
        </p>
      ))}
      {exercise.secondaryMuscles &&
        exercise.secondaryMuscles.map((muscle, index) => (
          <p key={index} className="muscles">
            {muscle}
          </p>
        ))}
      <p className="category">{exercise.category}</p>
      <p className="level">{exercise.level}</p>
      {exercise.equipment && <p className="equipment">{exercise.equipment}</p>}
      {exercise.instructions &&
        exercise.instructions.map((instruction, index) => (
          <p key={index} className="instructions">
            {instruction}
          </p>
        ))}
    </div>
  );
}
