import BackButton from "../BackButton";
import Toolbar from "../Toolbar";

export default function Name({ name: { full: fullName } }) {
  return (
    <Toolbar>
      <Toolbar.Left>
        <BackButton className="btn btn-outline-secondary">Back</BackButton>
      </Toolbar.Left>
      <Toolbar.Center>
        <h5 className="my-0">{fullName}</h5>
      </Toolbar.Center>
      <Toolbar.Right>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Actions
          </button>
          <ul className="dropdown-menu"></ul>
        </div>
      </Toolbar.Right>
    </Toolbar>
  );
}
