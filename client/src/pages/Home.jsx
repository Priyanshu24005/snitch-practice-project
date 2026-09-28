import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { fetchProducts } from "../state/productslice";
import ProductGrid from "../components/ProductGrid";
import Loader from "../components/Loader";

// Sirf UI, backend mein categories API nahi hai
const CATEGORIES = [
  { name: "Men", note: "Everyday essentials" },
  { name: "Women", note: "Clean silhouettes" },
  { name: "Streetwear", note: "Oversized & bold" },
  { name: "Accessories", note: "Finish the look" },
];

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featured = (products || []).slice(0, 8);
  const heroImage = featured[0]?.images?.[0];

  return (
    <div>
      {/* Hero */}
      <section className="bg-black text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-400">
              {user?.name ? `Welcome, ${user.name}` : "New season"}
            </p>
            <h1 className="text-5xl font-black uppercase leading-none tracking-wide sm:text-7xl">
              Wear
              <br />
              the drop
            </h1>
            <p className="mt-6 max-w-md text-gray-400">
              Minimal cuts, strong attitude. Naye styles dekho aur apna look
              banao.
            </p>
            <Link
              to="/main/products"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-gray-200"
            >
              Shop Now
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="aspect-[4/5] overflow-hidden rounded-xl bg-neutral-900">
            {heroImage ? (
              <img
                src={heroImage}
                alt={featured[0].title}
                className="h-full w-full object-cover opacity-90"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl font-black tracking-widest text-neutral-700">
                SNITCH
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-2xl font-black uppercase tracking-wide">
          Shop by category
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.name}
              to="/main/products"
              className="group flex aspect-[4/5] flex-col justify-end rounded-xl bg-gray-100 p-5 transition hover:bg-black hover:text-white"
            >
              <p className="text-xl font-bold uppercase">{c.name}</p>
              <p className="text-sm text-gray-500 transition group-hover:text-gray-300">
                {c.note}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-black uppercase tracking-wide">
            Featured
          </h2>
          <Link to="/main/products" className="text-sm underline">
            View all
          </Link>
        </div>

        {isLoading && featured.length === 0 ? (
          <Loader />
        ) : error ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-red-600">{error}</p>
            <button
              onClick={() => dispatch(fetchProducts())}
              className="rounded-full bg-black px-6 py-3 text-white"
            >
              Try again
            </button>
          </div>
        ) : (
          <ProductGrid products={featured} />
        )}
      </section>
    </div>
  );
};

export default Home;