import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const ProductForm = ({
  fetchProducts,
  editingProduct,
  setEditingProduct,
  notifySuccess,
  notifyError,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setDescription(editingProduct.description);
      setPrice(editingProduct.price);
      setInStock(editingProduct.in_stock);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setInStock(true); // Default to true for new products
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      price,
      in_stock: inStock,
    };

    try {
      if (editingProduct) {
        await axios.put(
          `${BASE_URL}/api/product/${editingProduct.id}/`,
          productData
        );
        notifySuccess("Product updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/api/product/`, productData);
        notifySuccess("Product added successfully!");
      }
      fetchProducts(); // Refresh the list after adding/updating
      setEditingProduct(null); // Reset editing mode
    } catch (error) {
      notifyError("Error adding/updating product");
      console.error("Error adding/updating product:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          <label className="form-check-label">In Stock</label>
        </div>
        <button type="submit" className="btn btn-primary">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
