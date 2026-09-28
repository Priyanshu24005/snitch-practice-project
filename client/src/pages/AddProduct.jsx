import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ImagePlus, Plus, Trash2, X } from "lucide-react";
import { createProduct } from "../state/sellerslice.jsx";
import { SIZE_OPTIONS } from "../utils/cart.js";

const MAX_IMAGES = 5;

// Postman (201 Created) mein key "size" hai. Backend alag maange to sirf yahan badlo.
const SIZE_FIELD_NAME = "size";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black";

const ErrorText = ({ message }) =>
  message ? <p className="mt-1 text-xs text-red-600">{message}</p> : null;

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreating } = useSelector((state) => state.seller);

  // [{ file, preview }]
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      currency: "INR",
      sizes: [{ size: "M", stock: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  const handleAddSize = () => {
    const used = getValues("sizes").map((s) => s.size);
    const next = SIZE_OPTIONS.find((s) => !used.includes(s));
    if (!next) {
      toast.info("Saare sizes add ho chuke hain");
      return;
    }
    append({ size: next, stock: "" });
  };

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    e.target.value = ""; // same file dobara select ho sake

    const combined = [...images, ...selected];
    if (combined.length > MAX_IMAGES) {
      setImageError(`Maximum ${MAX_IMAGES} images allowed`);
      setImages(combined.slice(0, MAX_IMAGES));
      return;
    }
    setImageError("");
    setImages(combined);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(images[index].preview);
    setImages(images.filter((_, i) => i !== index));
    setImageError("");
  };

  const onSubmit = async (data) => {
    if (images.length === 0) {
      setImageError("Kam se kam 1 image add karo");
      return;
    }

    const sizeNames = data.sizes.map((s) => s.size);
    if (new Set(sizeNames).size !== sizeNames.length) {
      toast.error("Ek size sirf ek baar add karo");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title.trim());
    formData.append("description", data.description.trim());
    formData.append(
      "price",
      JSON.stringify({ amount: Number(data.amount), currency: data.currency })
    );
    formData.append(
      SIZE_FIELD_NAME,
      JSON.stringify(
        data.sizes.map((s) => ({ size: s.size, stock: Number(s.stock) }))
      )
    );
    images.forEach((img) => formData.append("images", img.file));

    try {
      await dispatch(createProduct(formData)).unwrap();
      toast.success("Product create ho gaya. Ab use List karo.");
      navigate("/seller/products");
    } catch (message) {
      toast.error(message || "Product create nahi hua");
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-3xl font-black uppercase tracking-wide">
        Add Product
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-semibold uppercase">
            Title
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="Oversized black tee"
            {...register("title", {
              required: "Title required hai",
              minLength: { value: 2, message: "Kam se kam 2 characters" },
              maxLength: { value: 100, message: "Maximum 100 characters" },
            })}
          />
          <ErrorText message={errors.title?.message} />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-semibold uppercase">
            Description
          </label>
          <textarea
            rows={5}
            className={inputClass}
            placeholder="Product ke baare mein likho (20 se 500 characters)"
            {...register("description", {
              required: "Description required hai",
              minLength: { value: 20, message: "Kam se kam 20 characters" },
              maxLength: { value: 500, message: "Maximum 500 characters" },
            })}
          />
          <ErrorText message={errors.description?.message} />
        </div>

        {/* Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-semibold uppercase">
              Price
            </label>
            <input
              type="number"
              min="0"
              className={inputClass}
              placeholder="999"
              {...register("amount", {
                required: "Price required hai",
                min: { value: 1, message: "Price 1 se zyada honi chahiye" },
              })}
            />
            <ErrorText message={errors.amount?.message} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold uppercase">
              Currency
            </label>
            <select className={inputClass} {...register("currency")}>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold uppercase">
              Sizes & Stock
            </label>
            <button
              type="button"
              onClick={handleAddSize}
              className="inline-flex items-center gap-1 text-sm underline"
            >
              <Plus size={14} /> Add size
            </button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id}>
                <div className="flex items-center gap-3">
                  <select
                    className={`${inputClass} w-28`}
                    {...register(`sizes.${index}.size`)}
                  >
                    {SIZE_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="0"
                    className={inputClass}
                    placeholder="Stock"
                    {...register(`sizes.${index}.stock`, {
                      required: "Stock required hai",
                      min: { value: 0, message: "Stock 0 ya usse zyada" },
                      validate: (v) =>
                        Number.isInteger(Number(v)) || "Whole number daalo",
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    className="p-2 text-gray-500 hover:text-black disabled:opacity-30"
                    aria-label="Remove size"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <ErrorText message={errors.sizes?.[index]?.stock?.message} />
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="mb-2 block text-sm font-semibold uppercase">
            Images ({images.length}/{MAX_IMAGES})
          </label>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {images.map((img, index) => (
              <div
                key={img.preview}
                className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100"
              >
                <img
                  src={img.preview}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-1 top-1 rounded-full bg-black p-1 text-white"
                  aria-label="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            {images.length < MAX_IMAGES && (
              <label className="flex aspect-[3/4] cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-gray-400 text-gray-500 transition hover:border-black hover:text-black">
                <ImagePlus size={22} />
                <span className="text-xs">Add</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
          <ErrorText message={imageError} />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isCreating}
            className="flex-1 rounded-full bg-black py-4 text-white transition hover:bg-gray-800 disabled:opacity-60"
          >
            {isCreating ? "Uploading... thoda time lag sakta hai" : "Create Product"}
          </button>
          <Link
            to="/seller/products"
            className="rounded-full border border-gray-300 px-8 py-4 text-center transition hover:border-black"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;