import BackButton from "../BackButton";
import Modal from "../Modal";
import Toolbar from "../Toolbar";
import NameForm from "./NameForm";

export default function PersonToolbar({ person }) {
  const name = person.primary_name;
  const label = name.full;

  return (
    <>
      <Toolbar>
        <Toolbar.Left>
          <BackButton className="btn btn-outline-secondary">Back</BackButton>
        </Toolbar.Left>
        <Toolbar.Center>
          <h5 className="my-0">{label}</h5>
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
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#name-edit-modal" data-bs-toggle="modal">
                  Rename
                </a>
              </li>
            </ul>
          </div>
        </Toolbar.Right>
      </Toolbar>
      <Modal id="name-edit-modal" size="lg" title="Edit person name">
        <NameForm name={name} />
      </Modal>
    </>
  );
}
