import Product from './Product';
import AddProduct from "./AddProduct";

const ProductConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/products',
      element: <Product />,
    },
    {
      path: '/add-product',
      element: <AddProduct />,
    },
  ],
};

export default ProductConfig;
