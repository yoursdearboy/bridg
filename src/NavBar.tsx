import { NavLink } from "react-router-dom";

const Link = (props) => (
  <NavLink
    className={({ isActive }) =>
      (isActive ? "text-foreground" : "text-muted-foreground") +
      " transition-colors hover:text-foreground"
    }
    {...props}
  />
);

export default function NavBar({ className }) {
  return (
    <div className={`flex h-14 items-center border-b bg-background ${className}`}>
      <nav className="flex flex-row items-center gap-4 text-lg font-medium">
        <Link to="/">umdb</Link>
        <Link to="/persons">Persons</Link>
      </nav>
    </div>
  );
}
