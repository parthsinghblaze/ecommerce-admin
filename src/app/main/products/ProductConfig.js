import Product from './Product';

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
  ],
};

export default ProductConfig;
