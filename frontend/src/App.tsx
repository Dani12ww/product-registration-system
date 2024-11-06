import React from 'react';
import ProductTable from './components/ProductTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProductProvider } from './contexts/ProductContext';

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <ThemeProvider>
        <ProductProvider>
          <div id="content" className="app container py-4">
            <ToastContainer />
            <h1 className="text-center mb-4">Product Management</h1>
            <ProductTable />
          </div>
        </ProductProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
};

export default App;
