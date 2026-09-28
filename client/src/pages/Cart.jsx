import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { fetchCart } from "../state/cartslice";
import { getProductByIdApi } from "../api/product.api";
import { formatPrice } from "../utils/products.js";
import { getQuantity } from "../utils/cart.js";
import Loader from "../components/Loader";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, isLoading, error } = useSelector((state) => state.cart);

  // { productId: productObject }
  const [productMap, setProductMap] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(false);

  // 1. Cart lao
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // 2. Cart items mein sirf product id hai, isliye har product ki details lao
  useEffect(() => {
    const items = cart?.products || [];
    if (items.length === 0) return;

    const ids = [...new Set(items.map((item) => item.product))];
    let ignore = false;

    const loadProducts = async () => {
      setLoadingProducts(true);
      const results = await Promise.allSettled(
        ids.map((id) => getProductByIdApi(id))
      );
      if (ignore) return;

      const map = {};
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          map[ids[index]] = result.value.data.data.product;
        }
      });
      setProductMap(map);
      setLoadingProducts(false);
    };

    loadProducts();

    return () => {
      ignore = true;
    };
  }, [cart]);

  if (isLoading && !cart) return <Loader />;

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="mb-4 text-gray-600">{error}</p>
        <button
          onClick={() => dispatch(fetchCart())}
          className="rounded-full bg-black px-6 py-3 text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  const items = cart?.products || [];

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="mb-3 text-3xl font-bold uppercase">Your cart is empty</h1>
        <p className="mb-8 text-gray-500">Kuch accha sa dhundo.</p>
        <Link
          to="/main/products"
          className="rounded-full bg-black px-8 py-3 text-white transition hover:bg-gray-800"
        >
          Shop Products
        </Link>
      </div>
    );
  }

  // Total frontend pe calculate
  let total = 0;
  let currency = "INR";
  items.forEach((item) => {
    const product = productMap[item.product];
    if (product) {
      total += product.price.amount * getQuantity(item);
      currency = product.price.currency;
    }
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-10 text-3xl font-bold uppercase tracking-wide">
        Your Cart
      </h1>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-6 lg:col-span-2">
          {items.map((item) => {
            const product = productMap[item.product];
            const quantity = getQuantity(item);

            return (
              <div
                key={item._id}
                className="flex gap-4 border-b border-gray-200 pb-6"
              >
                <div className="h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-40 sm:w-32">
                  {product?.images?.[0] && (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  {product ? (
                    <>
                      <div>
                        <Link
                          to={`/main/products/${product._id}`}
                          className="text-lg font-semibold hover:underline"
                        >
                          {product.title}
                        </Link>
                        <p className="mt-1 text-sm text-gray-500">
                          Size: {item.size}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {quantity}
                        </p>
                      </div>
                      <p className="text-lg font-bold">
                        {formatPrice({
                          amount: product.price.amount * quantity,
                          currency: product.price.currency,
                        })}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {loadingProducts
                        ? "Loading..."
                        : "Ye product ab available nahi hai."}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl border border-gray-200 p-6">
          <h2 className="mb-4 text-lg font-semibold uppercase">Summary</h2>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Items</span>
            <span>{items.length}</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice({ amount: total, currency })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;