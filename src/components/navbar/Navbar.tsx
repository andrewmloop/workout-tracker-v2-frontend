import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="nav-container">
      <NavLink to="exercises" className="nav-link">
        Exercises
      </NavLink>
      <NavLink to="routines" className="nav-link">
        Routines
      </NavLink>
      <NavLink to="settings" className="nav-link">
        Settings
      </NavLink>
    </div>
  );
}
