import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import ProductForm from "./ProductForm";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  in_stock: boolean;
}

interface ProductTableProps {
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  notifySuccess,
  notifyError,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/product/?search=${search}&page=${page}`
      );
      setProducts(response.data.results);
      setPageCount(Math.ceil(response.data.count / 10));
    } catch (error) {
      notifyError("Error fetching products");
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/product/${productToDelete}/`);
      fetchProducts();
      setShowModal(false);
      notifySuccess("Product deleted successfully!");
    } catch (error) {
      notifyError("Error deleting product");
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowFormModal(true);
  };

  const handleShowModal = (id: number) => {
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
          value={search}
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
