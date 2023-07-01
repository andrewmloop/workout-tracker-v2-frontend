import { useNavigate } from "react-router-dom";
import "./TopNav.css";

export default function TopNav(props: {
  showBackButton: boolean;
  navText: string;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1 as any, { replace: true });
  };

  return (
    <div className="top-nav-container">
      <div className="back-button-container">
        {props.showBackButton && (
          <button className="back-button" onClick={handleClick}>
            &lt;--
          </button>
        )}
      </div>
      <div className="page-name-container">
        <p className="page-name">{props.navText}</p>
      </div>
    </div>
  );
}
