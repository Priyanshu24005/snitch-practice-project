import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchProducts } from "../state/productslice";
import ProductGrid from "../components/ProductGrid";
import Loader from "../components/Loader";

const Products = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Phase 4 mein cart API se connect hoga
  const handleAddToCart = () => {
    toast.info("Add to cart Phase 4 mein connect hoga");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-3xl font-black uppercase tracking-wide">
        All Products
      </h1>

      {isLoading && <Loader />}

      {!isLoading && error && (
        <div className="py-16 text-center">
          <p className="mb-4 text-red-600">{error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="rounded-full bg-black px-5 py-2 text-white"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <ProductGrid products={products} onAddToCart={handleAddToCart} />
      )}
    </section>
  );
};

export default Products;