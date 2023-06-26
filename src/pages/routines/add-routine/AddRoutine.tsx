import { useState } from "react";
import { ROUTES } from "../../../utils/route-enums";
import { useNavigate } from "react-router-dom";
import "./AddRoutine.css";

export default function AddRoutine() {
  const [name, setName] = useState("");
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
      const addRoutineUrl = import.meta.env.VITE_BACKEND_HOST + ROUTES.ROUTINE;
      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        name: name,
      });

      const response = await fetch(addRoutineUrl, {
        method: method,
        headers: headers,
        body: body,
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/routines");
      } else {
        console.log(data);
        setError(data.message[0]);
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-routine-page-container">
      <input
        type="text"
        className="routine-name-input"
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="routine-name-submit-button"
      >
        {loading ? "Loading..." : "Submit"}
      </button>
      {error.length > 0 && <p className="add-routine-error-text">{error}</p>}
    </div>
  );
}
