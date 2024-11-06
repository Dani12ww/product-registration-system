import React, { useEffect } from 'react';
import { Product, addOrEditProduct } from '../components/ProductService';
import { useNotification } from '../contexts/NotificationContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface ProductFormProps {
  editingProduct: Product | null;
  handleClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ editingProduct, handleClose }) => {
  const { notifySuccess, notifyError } = useNotification();

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number()
      .required('Price is required')
      .min(0, 'Price cannot be negative'),
    in_stock: Yup.boolean().required('Stock status is required'),
  });

  // Initial values for Formik
  const initialValues: Product = editingProduct || {
    id: 0,
    name: '',
    description: '',
    price: 0,
    in_stock: true,
  };

  // Form submission handler
  const handleSubmit = async (values: Product, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      await addOrEditProduct(values);
      notifySuccess('Product saved successfully!');
      handleClose();
    } catch (error) {
      notifyError('Error saving product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" className="form-control" disabled={isSubmitting} />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field type="text" id="description" name="description" className="form-control" disabled={isSubmitting} />
            <ErrorMessage name="description" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <Field type="number" id="price" name="price" className="form-control" disabled={isSubmitting} />
            <ErrorMessage name="price" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="in_stock">In Stock</label>
            <Field as="select" id="in_stock" name="in_stock" className="form-control" disabled={isSubmitting}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Field>
            <ErrorMessage name="in_stock" component="div" className="text-danger" />
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
