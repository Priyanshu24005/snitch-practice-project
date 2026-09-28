import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { addToCart } from "../state/cartslice";
import { SIZE_OPTIONS } from "../utils/cart.js";

const AddToCartPanel = ({ productId }) => {
  const dispatch = useDispatch();
  const { isAdding } = useSelector((state) => state.cart);

  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAdd = async () => {
    if (!size) {
      toast.error("Pehle size select karo");
      return;
    }

    try {
      await dispatch(addToCart({ productId, quantity, size })).unwrap();
      toast.success("Cart mein add ho gaya");
    } catch (message) {
      // rejectWithValue ka string yahan aata hai
      toast.error(message || "Cart mein add nahi hua");
    }
  };

  return (
    <div className="space-y-8">
      {/* Size */}
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide">
          Size
        </p>
        <div className="flex flex-wrap gap-3">
          {SIZE_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`h-12 w-14 rounded-full border text-sm transition ${
                size === s
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide">
          Quantity
        </p>
        <div className="inline-flex items-center gap-6 rounded-full border border-gray-300 px-5 py-3">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Minus size={18} />
          </button>
          <span className="w-6 text-center">{quantity}</span>
          <button type="button" onClick={() => setQuantity((q) => q + 1)}>
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={handleAdd}
        disabled={isAdding}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-white transition hover:bg-gray-800 disabled:opacity-60"
      >
        <ShoppingCart size={20} />
        {isAdding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
};

export default AddToCartPanel;