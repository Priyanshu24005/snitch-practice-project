import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";
import { formatPrice, getSizes } from "../utils/products.js";

const ProductCard = ({ product }) => {
  const sizes = getSizes(product);
  const sizeText = sizes
    .map((s) => s.size)
    .filter(Boolean)
    .join(", ");
  const hasStock = sizes.some((s) => typeof s.stock === "number");
  const totalStock = sizes.reduce((sum, s) => sum + (s.stock || 0), 0);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg">
      <Link
        to={`/main/products/${product._id}`}
        className="block aspect-[3/4] overflow-hidden bg-gray-100"
      >
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No image
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="truncate text-base font-semibold">{product.title}</h3>

        <p className="text-lg font-bold">
          {formatPrice(product.price)}
          <span className="ml-2 text-xs font-normal text-gray-500">
            {product.price?.currency}
          </span>
        </p>

        {sizeText && <p className="text-sm text-gray-500">Size: {sizeText}</p>}
        {hasStock && (
          <p className="text-sm text-gray-500">Stock: {totalStock}</p>
        )}

        <div className="mt-auto flex gap-2 pt-3">
          <Link
            to={`/main/products/${product._id}`}
            className="flex-1 rounded-full border border-black px-3 py-2 text-center text-sm transition hover:bg-black hover:text-white"
          >
            View Details
          </Link>
          <Link
            to={`/main/products/${product._id}`}
            className="flex items-center justify-center gap-1 rounded-full bg-black px-3 py-2 text-sm text-white transition hover:bg-gray-800"
          >
            <ShoppingCart size={16} />
            Add
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;