import NavbarLink from "../navbar-link/NavbarLink";

import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="nav-container">
      <div className="link-container">
        <NavbarLink to="/exercises" name="Exercises" />
      </div>
      <div className="link-container">
        <NavbarLink to="/" name="Routines" />
      </div>
      <div className="link-container">
        <NavbarLink to="/settings" name="Settings" />
      </div>
    </div>
  );
}
