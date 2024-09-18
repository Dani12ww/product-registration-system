// src/components/ProductFormModal.tsx
import React from "react";
import { Modal } from "react-bootstrap";
import ProductForm from "./ProductForm";
import { Product } from "./ProductService";

interface ProductFormModalProps {
  show: boolean;
  handleClose: () => void;
  editingProduct: Product | null;
  fetchProducts: () => void;
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  show,
  handleClose,
  editingProduct,
  fetchProducts,
  notifySuccess,
  notifyError,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editingProduct ? "Edit Product" : "Add Product"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductForm
          fetchProducts={fetchProducts}
          editingProduct={editingProduct}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ProductFormModal;
