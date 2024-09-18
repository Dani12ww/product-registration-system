// src/services/ProductService.ts
import axios from "axios";

// Define the Product interface
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  in_stock: boolean;
}

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const fetchProducts = async (search: string, page: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/product/`, {
      params: { search, page },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/api/product/${id}/`);
  } catch (error) {
    throw new Error("Error deleting product");
  }
};

export const addOrEditProduct = async (product: Product): Promise<void> => {
  try {
    if (product.id) {
      // Edit existing product
      await axios.put(`${BASE_URL}/api/product/${product.id}/`, product);
    } else {
      // Add new product
      await axios.post(`${BASE_URL}/api/product/`, product);
    }
  } catch (error) {
    throw new Error("Error adding or editing product");
  }
};
