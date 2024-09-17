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
  // Consolidating form state into a single object
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    inStock: true,
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        inStock: editingProduct.in_stock,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        inStock: true, // Default to true for new products
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      in_stock: formData.inStock,
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
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            name="inStock"
            className="form-check-input"
            checked={formData.inStock}
            onChange={handleChange}
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
