export const formatPrice = (price) => {
  if (!price) return "";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: price.currency || "INR",
    maximumFractionDigits: 0,
  }).format(price.amount);
};

// size array ko hamesha [{ size, stock }] form mein convert karta hai
export const getSizes = (product) =>
  (product?.size || []).map((s) =>
    typeof s === "string" ? { size: s } : s
  );