import { useState, useEffect } from 'react';
import { fetchProducts, Product } from "../components/ProductService";
import { useNotification } from '../contexts/NotificationContext';

const useProducts = (search: string, page: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const { notifyError } = useNotification();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(search, page);
        setProducts(data.results);
        setPageCount(Math.ceil(data.count / 10));
      } catch (error) {
        notifyError("Error fetching products");
      }
    };

    loadProducts();
  }, [search, page, notifyError]);

  return { products, pageCount };
};

export default useProducts;
