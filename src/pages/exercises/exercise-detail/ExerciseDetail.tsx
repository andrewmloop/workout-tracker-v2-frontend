import { useLocation } from "react-router-dom";
import { ExerciseDto } from "../../../entities/exercise";
import "./ExerciseDetail.css";
import TopNav from "../../../components/top-nav/TopNav";

export default function ExerciseDetail() {
  const location = useLocation();
  const exercise: ExerciseDto = location.state;

  return (
    <>
      <TopNav showBackButton={true} navText={exercise.name} />
      <div className="exercise-detail-page page-container">
        <div className="exercise-info-container">
          <p className="exercise-info-header">Primary Muscles</p>
          <div className="muscle-container">
            {exercise.primaryMuscles.map((muscle, index) => (
              <p key={index} className="muscle-tag">
                {muscle.slice(0, 1).toUpperCase() + muscle.slice(1)}
              </p>
            ))}
          </div>
        </div>
        {exercise.secondaryMuscles.length > 0 && (
          <div className="exercise-info-container">
            <p className="exercise-info-header">Secondary Muscles</p>
            <div className="muscle-container">
              {exercise.secondaryMuscles.map((muscle, index) => (
                <p key={index} className="muscle-tag">
                  {muscle.slice(0, 1).toUpperCase() + muscle.slice(1)}
                </p>
              ))}
            </div>
          </div>
        )}
        <div className="category-level-equipment-container">
          <div className="level-container">
            <p className="exercise-info-header">Level</p>
            <p className="level">
              {
                { adv: "Advanced", int: "Intermediate", beg: "Beginner" }[
                  exercise.level
                ]
              }
            </p>
          </div>
          <div className="category-container">
            <p className="exercise-info-header">Category</p>
            <p className="level">
              {exercise.category.slice(0, 1).toUpperCase() +
                exercise.category.slice(1)}
            </p>
          </div>
          {exercise.equipment && (
            <div className="equipment-container">
              <p className="exercise-info-header">Equipment</p>
              <p className="level">
                {exercise.equipment.slice(0, 1).toUpperCase() +
                  exercise.equipment.slice(1)}
              </p>
            </div>
          )}
        </div>
        <div className="instructions-container">
          <p className="exercise-info-header">Instructions</p>
          <ol className="instructions-list">
            {exercise.instructions.length > 0
              ? exercise.instructions.map((instruction, index) => (
                  <li key={index} className="instructions">
                    {instruction}
                  </li>
                ))
              : "There are no instructions for this exercise."}
          </ol>
        </div>
      </div>
    </>
  );
}
