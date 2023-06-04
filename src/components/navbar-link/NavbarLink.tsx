import { NavLink } from "react-router-dom";

import "./NavbarLink.css";

interface NavbarLinkProps {
  to: string;
  name: string;
}

export default function NavbarLink(props: NavbarLinkProps) {
  return (
    <NavLink className="navbar-link" to={props.to}>
      {props.name}
    </NavLink>
  );
}
