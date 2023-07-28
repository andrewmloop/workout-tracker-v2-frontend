import { useEffect, useState } from "react";
import { RoutineDto } from "../../../entities/routine";
import { ROUTES } from "../../../utils/route-enums";
import "./RoutineList.css";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "../../../components/top-nav/TopNav";
import { fetchApi } from "../../../utils/fetch-util";

export default function RoutineList() {
  const [routineList, setRoutineList] = useState<RoutineDto[]>([]);
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    try {
      const response = await fetchApi(ROUTES.ROUTINE, {
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setRoutineList(data);
      } else if (response.status === 401) {
        navigate("/auth/signin");
      } else {
        throw new Error(data.message);
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

type RoutineItemProps = { routine: RoutineDto; editMode: boolean };
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
