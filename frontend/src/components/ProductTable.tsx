import React from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import ProductFormModal from "./ProductFormModal";
import DeleteModal from "./DeleteModal";
import useProducts from "../hooks/useProducts";
import { useNotification } from "../contexts/NotificationContext";
import { useTheme } from "../contexts/ThemeContext";
import { deleteProduct } from "../components/ProductService";
import { useProduct } from "../contexts/ProductContext";

const ProductTable: React.FC = () => {
  const {
    search,
    setSearch,
    page,
    setPage,
    showModal,
    setShowModal,
    showFormModal,
    setShowFormModal,
    productToDelete,
    setProductToDelete,
    editingProduct,
    setEditingProduct,
  } = useProduct();

  const { products, pageCount } = useProducts(search, page);
  const { notifySuccess, notifyError } = useNotification();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleDelete = async () => {
    if (productToDelete === null) return;
    try {
      await deleteProduct(productToDelete);
      setShowModal(false);
      notifySuccess("Product deleted successfully!");
    } catch (error) {
      notifyError("Error deleting product");
    }
  };

  return (
    <div className="product-table container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="product-table__title">Product List</h2>
        <div className="d-flex align-items-center">
          <Button
            variant="outline-primary"
            className="product-table__add-button"
            onClick={() => {
              setEditingProduct(null);
              setShowFormModal(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Product
          </Button>
          <Button
            variant="link"
            className="ml-3 toggle-dark-mode"
            onClick={toggleDarkMode}
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </Button>
        </div>
      </div>

      <Form.Group controlId="searchProduct" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="product-table__search-input"
        />
      </Form.Group>

      <table className="table  table-bordered ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price & In Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>
                $
                {typeof product.price === "number"
                  ? product.price.toFixed(2)
                  : parseFloat(product.price).toFixed(2)}
                <Form.Check
                  type="checkbox"
                  label="In Stock"
                  className="ml-2"
                  checked={product.in_stock}
                  readOnly
                />
              </td>
              <td>
                <div className="table-actions">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => {
                      setEditingProduct(product);
                      setShowFormModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setProductToDelete(product.id);
                      setShowModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="pagination product-table__pagination mt-3">
        {Array.from({ length: pageCount }, (_, index) => (
          <Button
            key={index}
            variant={index + 1 === page ? "primary" : "outline-primary"}
            onClick={() => setPage(index + 1)}
            className="mr-2"
          >
            {index + 1}
          </Button>
        ))}
      </nav>

      <DeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleDelete={handleDelete}
      />

      <ProductFormModal
        show={showFormModal}
        handleClose={() => setShowFormModal(false)}
        editingProduct={editingProduct}
      />
    </div>
  );
};

export default ProductTable;
