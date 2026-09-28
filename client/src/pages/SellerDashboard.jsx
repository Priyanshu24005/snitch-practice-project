import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import { fetchSellerProducts } from "../state/sellerslice.jsx";
import { formatPrice, getSizes } from "../utils/products.js";
import Loader from "../components/Loader.jsx";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products, isLoading, error } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  if (isLoading && products.length === 0) return <Loader />;

  const total = products.length;
  const listed = products.filter((p) => p.published).length;
  const unlisted = total - listed;
  const totalStock = products.reduce(
    (sum, p) => sum + getSizes(p).reduce((s, x) => s + (x.stock || 0), 0),
    0
  );

  const stats = [
    { label: "Total Products", value: total },
    { label: "Listed", value: listed },
    { label: "Unlisted", value: unlisted },
    { label: "Total Stock", value: totalStock },
  ];

  const recent = products.slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Seller
          </p>
          <h1 className="text-3xl font-black uppercase tracking-wide">
            Hi, {user?.name}
          </h1>
        </div>
        <Link
          to="/seller/products/create"
          className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm text-white transition hover:bg-gray-800"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {error && <p className="mb-6 text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="mt-2 text-4xl font-black">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold uppercase">Recent Products</h2>
          <Link to="/seller/products" className="text-sm underline">
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            Abhi koi product nahi hai.
          </p>
        ) : (
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {recent.map((p) => (
              <div key={p._id} className="flex items-center gap-4 py-4">
                <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {p.images?.[0] && (
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{p.title}</p>
                  <p className="text-sm text-gray-500">
                    {formatPrice(p.price)}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    p.published
                      ? "bg-black text-white"
                      : "border border-gray-300 text-gray-500"
                  }`}
                >
                  {p.published ? "Listed" : "Unlisted"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SellerDashboard;