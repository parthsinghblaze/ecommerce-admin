import useSWR from 'swr';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import {swrAxiosConfig} from '../product-api/api';
import Button from "@mui/material/Button";

function ProductContent() {
  const [products, setProducts] = useState([]);
  const [totalProductsCount, setTotalProductCount] = useState(null);
  const [pageNumber, setPageNumber] = useState(1)
  const [pageLimit, setPageLimit] = useState(50)
  const {
    data: productData,
    error,
    isLoading,
  } = useSWR(`admin/product/products?page=${pageNumber}&limit=${pageLimit}`, swrAxiosConfig);

  useEffect(() => {
    if (productData) {
      const { total, data } = productData;
      setProducts( [...products, ...data.products]);
      setTotalProductCount(Number(total));
    }
  }, [productData]);

  function loadMore() {
    setPageNumber(pageNumber + 1);
  }

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <div className="w-full overflow-x-auto overflow-y-auto p-20">
        <div className="grid lg:grid-cols-4 gap-20">
          {products.map((item, index) => {
            return <ProductCard key={index} productData={item} />;
          })}
        </div>
        <div className="py-32">
        {
          totalProductsCount === products.length ? (
              <h5 className="text-center">No More Data</h5>
          )  : (
              <div className="text-center"><Button onClick={loadMore}>Load More</Button></div>
          )
        }
        </div>
      </div>
    </div>
  );
}

export default ProductContent;
