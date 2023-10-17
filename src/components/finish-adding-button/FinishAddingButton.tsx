import { useNavigate } from "react-router-dom";
import { useAddExerciseContext } from "../../context/add-exercise-context";
import { fetchApi, handleResponse } from "../../utils/fetch-util";
import { ROUTES } from "../../utils/route-enums";
import { useRoutineContext } from "../../context/routine-context";

import "./FinishAddingButton.css";

export default function FinishAddingButton() {
  const navigate = useNavigate();
  const { setIsAdding, exercisesToAdd, setExercisesToAdd, routineId } =
    useAddExerciseContext();
  const { setRoutineList } = useRoutineContext();

  const handleFinish = async () => {
    try {
      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        exerciseIds: exercisesToAdd,
      });

      const response = await fetchApi(
        ROUTES.ROUTINE_ID_ADD.replace(":id", routineId),
        {
          method: method,
          headers: headers,
          body: body,
          credentials: "include",
        }
      );

      await handleResponse(response, setRoutineList);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsAdding(false);
      setExercisesToAdd([]);
      navigate("/routines");
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
