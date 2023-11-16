import { useNavigate } from "react-router-dom";
import { useAddExerciseContext } from "../../context/add-exercise-context";
import { useRoutineContext } from "../../context/routine-context";
import { postNewExercisesForRoutine } from "../../services/routine-service";
import { UnauthorizedError } from "../../entities/unauthorized-error";

import "./FinishAddingButton.css";

export default function FinishAddingButton() {
  const navigate = useNavigate();
  const { setIsAdding, exercisesToAdd, setExercisesToAdd, routineId } =
    useAddExerciseContext();
  const { updateRoutine } = useRoutineContext();

  const handleFinish = async () => {
    try {
      const data = await postNewExercisesForRoutine(routineId, exercisesToAdd);

      if (data instanceof UnauthorizedError) {
        navigate("/auth/signin");
      } else if (data instanceof Error) {
        throw data;
      } else {
        updateRoutine(data);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsAdding(false);
      setExercisesToAdd([]);
      navigate(`/routines/detail/${routineId}`);
    }
  };

  return (
    <div className="button-container">
      <button className="add-button" onClick={handleFinish}>
        Finish Adding
      </button>
    </div>
  );
}
