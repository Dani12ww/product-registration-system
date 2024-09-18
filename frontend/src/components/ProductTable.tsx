import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { fetchProducts, deleteProduct, Product } from "./ProductService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import ProductFormModal from "./ProductFormModal";
import DeleteModal from "./DeleteModal";

// Define the props type for ProductTable
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
    loadProducts();
  }, [search, page]);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts(search, page);
      setProducts(data.results);
      setPageCount(Math.ceil(data.count / 10));
    } catch (error) {
      notifyError("Error fetching products");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(productToDelete!);
      loadProducts();
      setShowModal(false);
      notifySuccess("Product deleted successfully!");
    } catch (error) {
      notifyError("Error deleting product");
    }
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
          onChange={(e) => setSearch(e.target.value)}
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
                    onClick={() => {
                      setEditingProduct(product);
                      setShowFormModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      setProductToDelete(product.id);
                      setShowModal(true);
                    }}
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

      <DeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleDelete={handleDelete}
      />

      <ProductFormModal
        show={showFormModal}
        handleClose={() => setShowFormModal(false)}
        editingProduct={editingProduct}
        fetchProducts={loadProducts}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
      />
    </div>
  );
};

export default ProductTable;
