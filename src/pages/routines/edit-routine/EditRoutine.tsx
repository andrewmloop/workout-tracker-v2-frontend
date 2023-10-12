import { useState } from "react";
import { ROUTES } from "../../../utils/route-enums";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditRoutine.css";
import TopNav from "../../../components/top-nav/TopNav";
import { fetchApi, handleResponse } from "../../../utils/fetch-util";
import { RoutineDTO } from "../../../entities/routine";

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
      const method = "PATCH";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        name: name,
      });

      const response = await fetchApi(ROUTES.ROUTINE + routine._id, {
        method: method,
        headers: headers,
        body: body,
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/routines");
      } else if (response.status === 401) {
        navigate("/auth/signin");
      } else {
        setError(data.message[0]);
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
