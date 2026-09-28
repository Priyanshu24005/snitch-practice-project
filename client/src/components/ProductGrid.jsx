import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onAddToCart }) => {
  if (!products || products.length === 0) {
    return (
      <p className="py-16 text-center text-gray-500">No products found.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;