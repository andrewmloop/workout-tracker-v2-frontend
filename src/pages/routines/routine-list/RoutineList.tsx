import { useEffect, useState } from "react";
import { RoutineDto } from "../../../entities/routine";
import { ROUTES } from "../../../utils/route-enums";
import "./RoutineList.css";
import { Link } from "react-router-dom";

export default function RoutineList() {
  const [routineList, setRoutineList] = useState<RoutineDto[]>([]);

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    const getRoutineUrl = import.meta.env.VITE_BACKEND_HOST + ROUTES.ROUTINE;

    try {
      const response = await fetch(getRoutineUrl, {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImUyZUBlbWFpbC5jb20iLCJzdWIiOiI2NDZkNjc4NDk1MzRmYzUxY2I0YjcxZWQiLCJpYXQiOjE2ODY3NzM0NDMsImV4cCI6MTY4NzM3ODI0M30.5ibxzEj3DMfYdAgTq58TBUpnCcHrw88cl_bsKZX96r8",
        },
      });

      const data = await response.json();

      console.log(data);
      setRoutineList(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="routine-list-page-container">
      <div className="routine-list-buttons-container">
        <button className="add-routine-button">Add</button>
        <button className="edit-routine-button">Edit</button>
      </div>
      <div className="routine-list-container">
        {routineList.map((routine) => (
          <RoutineItem routine={routine} />
        ))}
      </div>
    </div>
  );
}

type RoutineItemProps = { routine: RoutineDto };
function RoutineItem(props: RoutineItemProps) {
  return (
    <Link
      to={"/routines/detail"}
      state={props.routine}
      className="routine-container"
    >
      <p className="routine-name">{props.routine.name}</p>
    </Link>
  );
}
