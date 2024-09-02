import React, { useState, useEffect } from "react";
import ProductTable from "./components/ProductTable";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/product/");
      setProducts(response.data.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  return (
    <div id="content">
      <ToastContainer />
      <h1>Product Management</h1>
      <ProductTable
        products={products}
        fetchProducts={fetchProducts}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
      />
    </div>
  );
};

export default App;
