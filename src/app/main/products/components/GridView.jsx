import ProductCard from "./ProductCard";

function GridView({products}) {
    return (
        <div className="grid lg:grid-cols-4 gap-20">
            {products.map((item, index) => {
                return <ProductCard key={index} productData={item} />;
            })}
        </div>
    )
}

export default GridView