import { useNavigate } from "react-router-dom";
import "./Settings.css";
import { ROUTES } from "../../utils/route-enums";

export default function Settings() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const singOutUrl = import.meta.env.VITE_BACKEND_HOST + ROUTES.SIGN_OUT;
    const method = "GET";

    try {
      const response = await fetch(singOutUrl, {
        method: method,
        credentials: "include",
      });

      if (response.ok) {
        navigate("/auth/signin");
      } else {
        throw new Error("Unable to sign out");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="settings-page-container">
      <button onClick={handleSignOut} className="log-out-button">
        Sign Out
      </button>
    </div>
  );
}
