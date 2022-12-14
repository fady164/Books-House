import React from "react";
import Modal from "react-bootstrap/Modal";

export default function Modalnew({ show, handleClose, children, packages }) {
  return (
    <div className="shadow rounded">
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        autoFocus="true"
        centered="true"
      >
        <Modal.Header closeButton>
          {packages && (
            <div>
              <span>
                Your Package:
                <span className="text-primary mx-1">
                  {" "}
                  {packages.packageName}
                </span>
              </span>
              <span className="mx-3">
                Price: ${" "}
                <span className="text-success"> {packages.packagePrice}</span>
              </span>
            </div>
          )}
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  );
}
