import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import ProductForm from "./ProductForm.jsx";

const ProductTable = ({
  products,
  pageCount,
  page,
  setPage,
  fetchProducts,
  notifySuccess,
  notifyError,
  setSearch,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/product/${productToDelete}/`);
      fetchProducts(); // Refetch products after deletion
      setShowModal(false);
      notifySuccess("Product deleted successfully!");
    } catch (error) {
      notifyError("Error deleting product");
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowFormModal(true);
  };

  const handleShowModal = (id) => {
    setProductToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductToDelete(null);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setEditingProduct(null);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="table-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Product List</h1>
        <Button variant="primary" onClick={() => setShowFormModal(true)}>
          <FontAwesomeIcon icon={faPlus} /> Add Product
        </Button>
      </div>
      <div className="d-flex mb-3">
        <input
          type="text"
          placeholder="Search products..."
          onChange={handleSearch}
          className="form-control"
        />
      </div>
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>In Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.in_stock ? "Yes" : "No"}</td>
              <td>
                <div className="table-actions">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(product)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleShowModal(product.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="pagination">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            className={`page-link ${index + 1 === page ? "active" : ""}`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </nav>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showFormModal}
        onHide={handleCloseFormModal}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            fetchProducts={fetchProducts}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
            notifySuccess={notifySuccess}
            notifyError={notifyError}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductTable;
