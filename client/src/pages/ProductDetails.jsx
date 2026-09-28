import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { fetchProduct } from "../state/productslice";
import { formatPrice } from "../utils/products.js";
import Loader from "../components/Loader";
import AddToCartPanel from "../components/AddToCartPanel";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector((state) => state.product);

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProduct(id));
    setActiveImage(0);
  }, [dispatch, id]);

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="py-24 text-center">
        <p className="mb-4 text-red-600">{error}</p>
        <Link to="/main/products" className="underline">
          Back to products
        </Link>
      </div>
    );
  }

  if (!product) return null;

  const images = product.images || [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        to="/main/products"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black"
      >
        <ArrowLeft size={16} /> Back
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
            {images[activeImage] ? (
              <img
                src={images[activeImage]}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition ${
                    i === activeImage ? "border-black" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-black uppercase tracking-wide">
            {product.title}
          </h1>

          <p className="text-2xl font-bold">
            {formatPrice(product.price)}
            <span className="ml-2 text-sm font-normal text-gray-500">
              {product.price?.currency}
            </span>
          </p>

          <p className="leading-relaxed text-gray-600">{product.description}</p>

          <AddToCartPanel key={product._id} productId={product._id} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;