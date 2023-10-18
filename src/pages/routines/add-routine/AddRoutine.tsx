import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../../../components/top-nav/TopNav";
import { postRoutine } from "../../../services/routine-service";
import { UnauthorizedError } from "../../../entities/unauthorized-error";

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
      const data = await postRoutine(name);

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
      <TopNav showBackButton={true} navText="Add Routine" />
      <div className="add-routine-page page-container">
        <label>Routine Name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <button type="submit" onClick={handleSubmit}>
          {loading ? "Loading..." : "Submit"}
        </button>
        {error.length > 0 && <p className="error-text">{error}</p>}
      </div>
    </>
  );
}
