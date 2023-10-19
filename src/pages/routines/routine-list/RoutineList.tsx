import { useEffect, useState } from "react";
import { RoutineDTO } from "../../../entities/routine";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "../../../components/top-nav/TopNav";
import { useRoutineContext } from "../../../context/routine-context";
import {
  deleteRoutine,
  getAllRoutines,
} from "../../../services/routine-service";
import { UnauthorizedError } from "../../../entities/unauthorized-error";

import "./RoutineList.css";

/**
 * A list component that displays the logged in user's routines.
 */
export default function RoutineList() {
  const navigate = useNavigate();
  const { routineList, setRoutineList } = useRoutineContext();
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    try {
      const data = await getAllRoutines();

      if (data instanceof UnauthorizedError) {
        navigate("/auth/signin");
      } else if (data instanceof Error) {
        throw data;
      } else {
        setRoutineList(data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleAddRoutine = () => {
    navigate("/routines/add");
  };

  const handleEditButton = () => {
    setEditMode(!editMode);
    setDeleteMode(false);
  };

  const handleDeleteButton = () => {
    setEditMode(false);
    setDeleteMode(!deleteMode);
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
            {editMode ? "Done" : "Edit"}
          </button>
          <button
            onClick={handleDeleteButton}
            className={`${
              deleteMode ? "delete-button" : "end-button"
            } delete-button routine-button`}
          >
            {deleteMode ? "Done" : "Delete"}
          </button>
        </div>
        <div className="routine-list-container">
          {routineList.length > 0 &&
            routineList.map((routine) => (
              <RoutineItem
                routine={routine}
                key={routine._id}
                editMode={editMode}
                deleteMode={deleteMode}
              />
            ))}
        </div>
      </div>
    </>
  );
}

type RoutineItemProps = {
  routine: RoutineDTO;
  editMode: boolean;
  deleteMode: boolean;
};
function RoutineItem(props: RoutineItemProps) {
  const navigate = useNavigate();
  const { removeRoutine } = useRoutineContext();

  const handleEdit = () => {
    navigate("/routines/edit", {
      state: props.routine,
    });
  };

  const handleDelete = async () => {
    const isSuccessfulDelete = await deleteRoutine(props.routine._id);

    try {
      if (isSuccessfulDelete instanceof UnauthorizedError) {
        navigate("/auth/signin");
      } else if (isSuccessfulDelete instanceof Error || !isSuccessfulDelete) {
        throw new Error(
          `Unable to delete routine with id: ${props.routine._id}`
        );
      } else {
        removeRoutine(props.routine._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="routine-container">
      <Link
        to={"/routines/detail"}
        state={props.routine}
        className="routine-link-container"
      >
        <p className="routine-name">{props.routine.name}</p>
        {!props.editMode && !props.deleteMode && <p>--&gt;</p>}
      </Link>
      {props.editMode && (
        <button onClick={handleEdit} className="edit-button">
          Edit
        </button>
      )}
      {props.deleteMode && (
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      )}
    </div>
  );
}
