import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../components/ProductService';

interface ProductContextProps {
  search: string;
  setSearch: (search: string) => void;
  page: number;
  setPage: (page: number) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  showFormModal: boolean;
  setShowFormModal: (show: boolean) => void;
  productToDelete: number | null;
  setProductToDelete: (id: number | null) => void;
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  return (
    <ProductContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
