import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ExerciseDto } from "../../../entities/exercise";
import { useExerciseContext } from "../../../context/exercise-context";
import TopNav from "../../../components/top-nav/TopNav";

import "./ExerciseDetail.css";

export default function ExerciseDetail() {
  const { exerciseId } = useParams();
  const { exerciseList } = useExerciseContext();
  const [thisExercise, setThisExercise] = useState<ExerciseDto>({
    _id: "",
    name: "",
    level: "",
    primaryMuscles: [],
    secondaryMuscles: [],
    equipment: "",
    category: "",
    instructions: [],
  });

  useEffect(() => {
    fetchExercise();
  }, []);

  // Fetch exercise from the store using the exerciseId route param
  const fetchExercise = () => {
    const exercise = exerciseList.find((e) => e._id === exerciseId);
    if (exercise) {
      setThisExercise(exercise);
    }
  };

  return (
    <>
      <TopNav showBackButton={true} navText={thisExercise.name} />
      <div className="exercise-detail-page page-container">
        <div className="exercise-info-container">
          <p className="exercise-info-header">Primary Muscles</p>
          <div className="muscle-container">
            {thisExercise.primaryMuscles.map((muscle, index) => (
              <p key={index} className="muscle-tag">
                {muscle.slice(0, 1).toUpperCase() + muscle.slice(1)}
              </p>
            ))}
          </div>
        </div>
        {thisExercise.secondaryMuscles.length > 0 && (
          <div className="exercise-info-container">
            <p className="exercise-info-header">Secondary Muscles</p>
            <div className="muscle-container">
              {thisExercise.secondaryMuscles.map((muscle, index) => (
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
                  thisExercise.level
                ]
              }
            </p>
          </div>
          <div className="category-container">
            <p className="exercise-info-header">Category</p>
            <p className="level">
              {thisExercise.category.slice(0, 1).toUpperCase() +
                thisExercise.category.slice(1)}
            </p>
          </div>
          {thisExercise.equipment && (
            <div className="equipment-container">
              <p className="exercise-info-header">Equipment</p>
              <p className="level">
                {thisExercise.equipment.slice(0, 1).toUpperCase() +
                  thisExercise.equipment.slice(1)}
              </p>
            </div>
          )}
        </div>
        <div className="instructions-container">
          <p className="exercise-info-header">Instructions</p>
          <ol className="instructions-list">
            {thisExercise.instructions?.length > 0
              ? thisExercise.instructions.map((instruction, index) => (
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
