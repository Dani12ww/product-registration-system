// src/components/DeleteModal.tsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

interface DeleteModalProps {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  show,
  handleClose,
  handleDelete,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
