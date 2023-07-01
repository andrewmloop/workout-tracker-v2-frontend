import { useEffect, useState } from "react";
import { RoutineDto } from "../../../entities/routine";
import { ROUTES } from "../../../utils/route-enums";
import "./RoutineList.css";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "../../../components/top-nav/TopNav";

export default function RoutineList() {
  const [routineList, setRoutineList] = useState<RoutineDto[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    const getRoutineUrl = import.meta.env.VITE_BACKEND_HOST + ROUTES.ROUTINE;

    try {
      const response = await fetch(getRoutineUrl, {
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
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

  return (
    <>
      <TopNav showBackButton={false} navText="Routines" />
      <div className="routine-list page-container">
        <div className="routine-list-buttons-container">
          <button onClick={handleAddRoutine} className="add-routine-button">
            Add
          </button>
          <button className="edit-routine-button">Edit</button>
        </div>
        <div className="routine-list-container">
          {routineList.length > 0 &&
            routineList.map((routine) => (
              <RoutineItem routine={routine} key={routine._id} />
            ))}
        </div>
      </div>
    </>
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
