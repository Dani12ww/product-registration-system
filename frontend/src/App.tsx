import React from "react";
import ProductTable from "./components/ProductTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  return (
    <div id="content">
      <ToastContainer />
      <h1>Product Management</h1>
      <ProductTable notifySuccess={notifySuccess} notifyError={notifyError} />
    </div>
  );
};

export default App;
