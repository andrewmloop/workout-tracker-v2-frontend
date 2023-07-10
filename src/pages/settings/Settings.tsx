import { useNavigate } from "react-router-dom";
import "./Settings.css";
import { ROUTES } from "../../utils/route-enums";
import TopNav from "../../components/top-nav/TopNav";
import { fetchApi } from "../../utils/fetch-util";

export default function Settings() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await fetchApi(ROUTES.SIGN_OUT, {
        credentials: "include",
      });

      if (response.ok || response.status === 401) {
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
