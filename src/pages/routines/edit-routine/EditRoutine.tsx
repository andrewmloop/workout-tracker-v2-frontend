import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNav from "../../../components/top-nav/TopNav";
import { RoutineDTO } from "../../../entities/routine";
import { patchRoutine } from "../../../services/routine-service";
import { UnauthorizedError } from "../../../entities/unauthorized-error";

import "./EditRoutine.css";

export default function EditRoutine() {
  const location = useLocation();
  const routine: RoutineDTO = location.state;

  const [name, setName] = useState(routine.name);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    if (name.length === 0) {
      setError("A routine name is needed");
      return;
    }

    setLoading(true);

    try {
      const data = await patchRoutine(routine._id, name);

      if (data instanceof UnauthorizedError) {
        navigate("/auth/signin");
      } else if (data instanceof Error) {
        setError(data.message);
      } else {
        navigate("/routines");
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopNav showBackButton={true} navText="Edit Routine" />
      <div className="edit-routine-page page-container">
        <label>Routine Name</label>
        <input
          type="text"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          {loading ? "Loading..." : "Submit"}
        </button>
        {error.length > 0 && <p className="error-text">{error}</p>}
      </div>
    </>
  );
}
