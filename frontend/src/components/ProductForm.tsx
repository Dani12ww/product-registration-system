import React, { useState, useEffect } from "react";
import { Product, addOrEditProduct } from "./ProductService";

interface ProductFormProps {
  fetchProducts: () => void;
  editingProduct: Product | null;
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  fetchProducts,
  editingProduct,
  notifySuccess,
  notifyError,
}) => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    in_stock: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct);
    } else {
      // Reset form when there's no product being edited
      setProduct({
        id: 0,
        name: "",
        description: "",
        price: 0,
        in_stock: true,
      });
    }
  }, [editingProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addOrEditProduct(product);
      notifySuccess("Product saved successfully!");
      fetchProducts();
      if (!editingProduct) {
        // Clear form if not in editing mode
        setProduct({
          id: 0,
          name: "",
          description: "",
          price: 0,
          in_stock: true,
        });
      }
    } catch (error) {
      notifyError("Error saving product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          className="form-control"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: parseFloat(e.target.value) || 0 })
          }
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label>In Stock</label>
        <select
          className="form-control"
          value={product.in_stock ? "true" : "false"}
          onChange={(e) =>
            setProduct({ ...product, in_stock: e.target.value === "true" })
          }
          disabled={isSubmitting}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
