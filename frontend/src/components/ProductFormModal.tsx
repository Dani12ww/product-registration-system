import React from 'react';
import { Modal } from 'react-bootstrap';
import ProductForm from './ProductForm';
import { Product } from './ProductService';

interface ProductFormModalProps {
  show: boolean;
  handleClose: () => void;
  editingProduct: Product | null;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ show, handleClose, editingProduct }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editingProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductForm editingProduct={editingProduct} handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default ProductFormModal;
