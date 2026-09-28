import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { fetchSellerProducts, changeListing } from "../state/sellerslice.jsx";
import { formatPrice, getSizes } from "../utils/products.js";
import Loader from "../components/Loader.jsx";

const SellerProducts = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error, updatingId } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  const handleToggle = async (product) => {
    const publish = !product.published;
    try {
      await dispatch(changeListing({ id: product._id, publish })).unwrap();
      toast.success(publish ? "Product listed" : "Product unlisted");
    } catch (message) {
      toast.error(message || "Kuch galat ho gaya");
    }
  };

  if (isLoading && products.length === 0) return <Loader />;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-black uppercase tracking-wide">
          My Products
        </h1>
        <Link
          to="/seller/products/create"
          className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm text-white transition hover:bg-gray-800"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {error && (
        <div className="mb-6 text-sm text-red-600">
          {error}{" "}
          <button
            onClick={() => dispatch(fetchSellerProducts())}
            className="underline"
          >
            Try again
          </button>
        </div>
      )}

      {products.length === 0 && !error ? (
        <div className="py-20 text-center">
          <p className="mb-6 text-gray-500">Tumne abhi koi product add nahi kiya.</p>
          <Link
            to="/seller/products/create"
            className="rounded-full bg-black px-8 py-3 text-white"
          >
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {products.map((product) => {
            const sizes = getSizes(product);
            const stock = sizes.reduce((sum, s) => sum + (s.stock || 0), 0);
            const isUpdating = updatingId === product._id;

            return (
              <div
                key={product._id}
                className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center"
              >
                <div className="flex flex-1 items-center gap-4">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {product.images?.[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold">
                      {product.title}
                    </p>
                    <p className="font-bold">{formatPrice(product.price)}</p>
                    <p className="text-sm text-gray-500">
                      Stock: {stock}
                      {sizes.length > 0 &&
                        ` (${sizes.map((s) => s.size).join(", ")})`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      product.published
                        ? "bg-black text-white"
                        : "border border-gray-300 text-gray-500"
                    }`}
                  >
                    {product.published ? "Listed" : "Unlisted"}
                  </span>

                  <button
                    onClick={() => handleToggle(product)}
                    disabled={isUpdating}
                    className="w-28 rounded-full border border-black px-4 py-2 text-sm transition hover:bg-black hover:text-white disabled:opacity-50"
                  >
                    {isUpdating
                      ? "Wait..."
                      : product.published
                      ? "Unlist"
                      : "List"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SellerProducts;