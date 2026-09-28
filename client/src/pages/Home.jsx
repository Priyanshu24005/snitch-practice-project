import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

import { fetchProducts } from "../state/productslice";
import ProductGrid from "../components/ProductGrid";
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { products, isLoading, error } = useSelector(
    (state) => state.product
  );

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
                alt={featured[0]?.title}
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

      {/* Why Shop With Us */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-2xl font-black uppercase tracking-wide">
          Why Shop With Us
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-xl bg-gray-100 p-6">
            <p className="mb-3 text-3xl">🚚</p>

            <h3 className="text-lg font-bold uppercase">
              Fast Delivery
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Quick and reliable delivery at your doorstep.
            </p>
          </div>

          <div className="rounded-xl bg-gray-100 p-6">
            <p className="mb-3 text-3xl">↩️</p>

            <h3 className="text-lg font-bold uppercase">
              Easy Returns
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Simple and hassle-free returns on your orders.
            </p>
          </div>

          <div className="rounded-xl bg-gray-100 p-6">
            <p className="mb-3 text-3xl">🔒</p>

            <h3 className="text-lg font-bold uppercase">
              Secure Payment
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Your payments and personal information stay protected.
            </p>
          </div>

          <div className="rounded-xl bg-gray-100 p-6">
            <p className="mb-3 text-3xl">✨</p>

            <h3 className="text-lg font-bold uppercase">
              Quality Products
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Carefully selected styles made for everyday wear.
            </p>
          </div>
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