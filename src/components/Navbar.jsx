import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="site-nav">
      <NavLink className="brand" to="/">
        mellemrum<span>.</span>
      </NavLink>
      <div className="nav-links">
        <NavLink to="/">Events</NavLink>
        <NavLink to="/om">Om Mellemrums</NavLink>
      </div>
    </nav>
  );
}
