import { useNavigate } from "react-router-dom";
import "./TopNav.css";

export default function TopNav() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1 as any, { replace: true });
  };

  return (
    <div className="top-nav-container">
      <div className="back-button-container">
        <button className="back-button" onClick={handleClick}>
          &lt;--
        </button>
      </div>
      <div className="page-name-container">
        <p className="page-name">Page Name</p>
      </div>
    </div>
  );
}
