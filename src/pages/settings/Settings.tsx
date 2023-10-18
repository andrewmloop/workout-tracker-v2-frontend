import { useNavigate } from "react-router-dom";
import TopNav from "../../components/top-nav/TopNav";
import { getSignOut } from "../../services/auth-service";

import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const hasBeenSignedOut = await getSignOut();

      if (hasBeenSignedOut) {
        navigate("/auth/signin");
      } else {
        throw new Error("Unable to sign out");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <TopNav showBackButton={true} navText="Settings" />
      <div className="settings-page page-container">
        <button onClick={handleSignOut} className="log-out-button">
          Sign Out
        </button>
      </div>
    </>
  );
}
