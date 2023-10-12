import { useEffect, useState } from "react";
import { RoutineDTO } from "../../../entities/routine";
import { ROUTES } from "../../../utils/route-enums";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "../../../components/top-nav/TopNav";
import { fetchApi, handleResponse } from "../../../utils/fetch-util";
import { useRoutineContext } from "../../../context/routine-context";

import "./RoutineList.css";

/**
 * A list component that displays the logged in user's routines.
 */
export default function RoutineList() {
  const navigate = useNavigate();
  const { routineList, setRoutineList } = useRoutineContext();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    try {
      const response = await fetchApi(ROUTES.ROUTINE, {
        credentials: "include",
      });

      await handleResponse(response, setRoutineList);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleAddRoutine = () => {
    navigate("/routines/add");
  };

  const handleEditButton = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      <TopNav showBackButton={false} navText="Routines" />
      <div className="routine-list-page page-container">
        <div className="routine-list-buttons-container">
          <button
            onClick={handleAddRoutine}
            className="add-button routine-button"
          >
            Add
          </button>
          <button
            onClick={handleEditButton}
            className={`${
              editMode ? "edit-button" : "end-button"
            } edit-button routine-button`}
          >
            {editMode ? "Stop Editing" : "Edit"}
          </button>
        </div>
        <div className="routine-list-container">
          {routineList.length > 0 &&
            routineList.map((routine) => (
              <RoutineItem
                routine={routine}
                key={routine._id}
                editMode={editMode}
              />
            ))}
        </div>
      </div>
    </>
  );
}

type RoutineItemProps = { routine: RoutineDTO; editMode: boolean };
function RoutineItem(props: RoutineItemProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/routines/edit", {
      state: props.routine,
    });
  };

  return (
    <Link
      to={"/routines/detail"}
      state={props.routine}
      className="routine-container"
    >
      <p className="routine-name">{props.routine.name}</p>
      {props.editMode ? (
        <button onClick={handleEdit} className="edit-button">
          Edit
        </button>
      ) : (
        <div className="routine-arrow-container">--&gt;</div>
      )}
    </Link>
  );
}
