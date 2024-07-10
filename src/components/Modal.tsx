import bootstrap from "bootstrap/dist/js/bootstrap";

export default function Modal({ children, id, size = "", title }: any) {
  return (
    <div className={`modal modal-${size}`} id={id}>
      <div className="modal-dialog">
        <div className="modal-content">
          {title && (
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          )}
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

Modal.dismiss = function dismiss(id) {
  bootstrap.Modal.getInstance(`#${id}`).hide();
};