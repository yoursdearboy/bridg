import { NavLink as RouterLink } from "react-router-dom";

const NavLink = (props) => (
  <RouterLink className={"nav-link " + (({ isActive }) => (isActive ? "active" : ""))} {...props} />
);

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-xxl">
        <RouterLink className="navbar-brand" to="/">
          umdb
        </RouterLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav-content"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav-content">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/persons">Persons</NavLink>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" />
          </form>
        </div>
      </div>
    </nav>
  );
}
