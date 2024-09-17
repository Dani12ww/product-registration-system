import React, { useState, useEffect } from "react";
import ProductTable from "./components/ProductTable.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Get the base URL from the environment variable
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/product/?search=${search}&page=${page}`
      );
      setProducts(response.data.results);
      setPageCount(Math.ceil(response.data.count / 10)); // Assuming page_size is 10
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  return (
    <div id="content">
      <ToastContainer />
      <h1>Product Management</h1>
      <ProductTable
        products={products}
        pageCount={pageCount}
        page={page}
        setPage={setPage}
        fetchProducts={fetchProducts}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
        setSearch={setSearch}
      />
    </div>
  );
};

export default App;
