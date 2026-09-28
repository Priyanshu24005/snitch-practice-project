// Backend validator ke hisaab se allowed sizes
export const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL"];

// Backend ke cart item mein field ka naam "quanity" (typo) hai.
// Isliye dono check kar rahe hain.
export const getQuantity = (item) => item.quantity ?? item.quanity ?? 1;